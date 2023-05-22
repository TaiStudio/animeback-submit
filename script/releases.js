/*-----------------------------------------------------------------------------------------------------------\
|  _____     _   _____ _             _ _          _____  _____  _____  __      _______  _____  _____  _____  |
| |_   _|   (_) /  ___| |           | (_)        / __  \|  _  |/ __  \/  |    / / __  \|  _  |/ __  \|____ | |
|   | | __ _ _  \ `--.| |_ _   _  __| |_  ___    `' / /'| |/' |`' / /'`| |   / /`' / /'| |/' |`' / /'    / / |
|   | |/ _` | |  `--. \ __| | | |/ _` | |/ _ \     / /  |  /| |  / /   | |  / /   / /  |  /| |  / /      \ \ |
|   | | (_| | | /\__/ / |_| |_| | (_| | | (_) |  ./ /___\ |_/ /./ /____| |_/ /  ./ /___\ |_/ /./ /___.___/ / |
|   \_/\__,_|_| \____/ \__|\__,_|\__,_|_|\___/   \_____/ \___/ \_____/\___/_/   \_____/ \___/ \_____/\____/  |
\-----------------------------------------------------------------------------------------------------------*/
const MAX_CONCURRENCY = Number(process.env.MAX_CONCURRENCY) || 4; // simultaneous open web requests
const RELEASE_CACHE_TTL = require("human-interval")(
  process.env.RELEASE_CACHE_TTL || "4 hours"
);

const fs = require("fs");
const path = require("path");
const Bottleneck = require("bottleneck");
const github = require("../lib/github");
const parseGitUrl = require("github-url-to-object");

const outputFile = path.join(__dirname, "../meta/releases.json");
const oldReleaseData = require(outputFile);
const output = {};
const limiter = new Bottleneck({
  maxConcurrent: MAX_CONCURRENCY,
})

const extensions = require("../lib/raw-extensions-list")();
const extensionsWithRepos = require("../lib/extensions-with-github-repos");

console.log(
  `${extensionsWithRepos.length} of ${extensions.length} extensions have a GitHub repo.`
);
console.log(
  `${
    extensionsWithRepos.filter(shouldUpdateextensionReleaseData).length
  } of those ${
    extensionsWithRepos.length
  } have missing or outdated release data.`
);

extensionsWithRepos.forEach((extension) => {
  if (shouldUpdateextensionReleaseData(extension)) {
    limiter
      .schedule(getLatestRelease, extension)
      .then((release) => {
        console.log(`${extension.slug}: got latest release`)
        output[extension.slug] = {
          latestRelease: release.data,
          latestReleaseFetchedAt: new Date(),
        }
      })
      .catch((err) => {
        console.error(`${extension.slug}: no releases found`)
        output[extension.slug] = {
          latestRelease: null,
          latestReleaseFetchedAt: new Date(),
        }
        if (err.status !== 404) console.error(err)
      })
  } else {
    output[extension.slug] = oldReleaseData[extension.slug]
  }
});

limiter.on("idle", () => {
  setTimeout(() => {
    fs.writeFileSync(outputFile, JSON.stringify(output, null, 2));
    console.log(`Done fetching release data.\nWrote ${outputFile}`);
    process.exit();
}, 1000)
});

function shouldUpdateextensionReleaseData(extension) {
  const oldData = oldReleaseData[extension.slug];
  if (!oldData || !oldData.latestReleaseFetchedAt) return true;
  const oldDate = new Date(oldData.latestReleaseFetchedAt || null).getTime();
  return oldDate + RELEASE_CACHE_TTL < Date.now();
}

function getLatestRelease(extension) {
    const { user: owner, repo } = parseGitUrl(extension.repository)
    const opts = {
      owner: owner,
      repo: repo,
      headers: {
        Accept: 'application/vnd.github.v3.html',
      },
    }
  
    return github.repos.getLatestRelease(opts)
}