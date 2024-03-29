/*-----------------------------------------------------------------------------------------------------------\
|  _____     _   _____ _             _ _          _____  _____  _____  __      _______  _____  _____  _____  |
| |_   _|   (_) /  ___| |           | (_)        / __  \|  _  |/ __  \/  |    / / __  \|  _  |/ __  \|____ | |
|   | | __ _ _  \ `--.| |_ _   _  __| |_  ___    `' / /'| |/' |`' / /'`| |   / /`' / /'| |/' |`' / /'    / / |
|   | |/ _` | |  `--. \ __| | | |/ _` | |/ _ \     / /  |  /| |  / /   | |  / /   / /  |  /| |  / /      \ \ |
|   | | (_| | | /\__/ / |_| |_| | (_| | | (_) |  ./ /___\ |_/ /./ /____| |_/ /  ./ /___\ |_/ /./ /___.___/ / |
|   \_/\__,_|_| \____/ \__|\__,_|\__,_|_|\___/   \_____/ \___/ \_____/\___/_/   \_____/ \___/ \_____/\____/  |
\-----------------------------------------------------------------------------------------------------------*/
const MAX_CONCURRENCY = Number(process.env.MAX_CONCURRENCY) || 4; // simultaneous open web requests
const README_CACHE_TTL = require("human-interval")(
  process.env.README_CACHE_TTL || "4 hours",
);

const fs = require("fs");
const path = require("path");
const Bottleneck = require("bottleneck");
const github = require("../lib/github");
const cheerio = require("cheerio");
const parseGitUrl = require("github-url-to-object");

const outputFile = path.join(__dirname, "../meta/readmes.json");
const oldReadmeData = require(outputFile);
const output = {};
const limiter = new Bottleneck({
  maxConcurrent: MAX_CONCURRENCY,
});

const extensions = require("../lib/raw-extensions-list")();
const extensionsWithRepos = require("../lib/extensions-with-github-repos");
const extensionsToUpdate = extensionsWithRepos.filter((extension) => {
  const oldData = oldReadmeData[extension.slug];
  if (!oldData) return true;
  const oldDate = new Date(oldData.readmeFetchedAt || null).getTime();
  return oldDate + README_CACHE_TTL < Date.now();
});

console.log(
  `${extensionsWithRepos.length} of ${extensions.length} extensions have a GitHub repo.`,
);
console.log(
  `${extensionsToUpdate.length} of those ${extensionsWithRepos.length} have missing or outdated README data.`,
);

extensionsToUpdate.forEach((extension) => {
  limiter
    .schedule(getReadme, extension)
    .then((repository) => {
      return repository.data.default_branch;
    })
    .catch((err) => {
      if (err.status !== 404) {
        console.error(`${extension.slug}: Non 404 error`);
        console.error(err);
      }

      return;
    })
    .then((defaultBranch) => {
      limiter
        .schedule(getReadme, extension, defaultBranch)
        .then((release) => {
          console.log(`${extension.slug}: got latest README`);
          output[extension.slug] = {
            readmeCleaned: cleanReadme(release.data, defaultBranch, extension),
            readmeOriginal: release.data,
            readmeFetchedAt: new Date(),
          };
        })
        .catch((err) => {
          console.error(`${extension.slug}: no README found`);
          output[extension.slug] = {
            readmeOriginal: null,
            readmeFetchedAt: new Date(),
          };
          if (err.status !== 404) {
            console.error(`${extension.slug}: Non 404 error`);
            console.error(err);
          }
        });
    });
});

limiter.on("idle", () => {
  setTimeout(() => {
    fs.writeFileSync(outputFile, JSON.stringify(output, null, 2));
    console.log(`Done fetching README files.\nWrote ${outputFile}`);
    process.exit();
  }, 1000);
});

function getReadme(extension, defaultBranch) {
  const { user: owner, repo } = parseGitUrl(extension.repository);
  const opts = {
    owner: owner,
    repo: repo,
    headers: {
      Accept: "application/vnd.github.v3.html",
    },
  };

  if (defaultBranch) {
    return github.repos.getReadme(opts);
  }

  return github.repos.get(opts);
}

function cleanReadme(readme, defaultBranch, extension) {
  const $ = cheerio.load(readme);

  const $relativeImages = $("img").not('[src^="http"]');
  if ($relativeImages.length) {
    console.log(
      `${extension.slug}: updating ${$relativeImages.length} relative image URLs`,
    );
    $relativeImages.each((i, img) => {
      $(img).attr(
        "src",
        `${extension.repository}/raw/${defaultBranch}/${$(img).attr("src")}`,
      );
    });
  }

  const $relativeLinks = $("a").not('[href^="http"]');
  if ($relativeLinks.length) {
    console.log(
      `${extension.slug}: updating ${$relativeLinks.length} relative links`,
    );
    $relativeLinks.each((i, link) => {
      $(link).attr(
        "href",
        `${extension.repository}/blob/${defaultBranch}/${$(link).attr("href")}`,
      );
    });
  }

  return $("body").html();
}
