const fs = require("fs");
const path = require("path");
const dates = require("../meta/dates.json");
const colors = require("../meta/colors.json");
const releases = require("../meta/releases.json");
const readmes = require("../meta/readmes.json");
const parseGitHubUrl = require("github-url-to-object");
const extensions = [];

fs.readdirSync(path.join(__dirname, "../extensions"))
  .filter((filename) => {
    return fs
      .statSync(path.join(__dirname, `../extensions/${filename}`))
      .isDirectory();
  })
  .forEach((slug) => {
    const jsonFile = path.join(__dirname, `../extensions/${slug}/${slug}.json`);
    var content = fs.readFileSync(jsonFile);
    const extension = Object.assign(
      { slug: slug },
      JSON.parse(content.toString())
      ,
      {
        icon: `${slug}-icon.png`,
        icon32: `${slug}-icon-32.png`,
        icon64: `${slug}-icon-64.png`,
        icon128: `${slug}-icon-128.png`,
        icon256: `${slug}-icon-256.png`,
        date: dates[slug],
        iconColors: colors[slug].palette,
      },
      releases[slug],
      readmes[slug]
    );
      console.log(extension)
    extension.goodColorOnWhite =
      extension.goodColorOnWhite || colors[slug].goodColorOnWhite;
    extension.goodColorOnBlack =
      extension.goodColorOnBlack || colors[slug].goodColorOnBlack;
    extension.faintColorOnWhite =
      extension.faintColorOnWhite || colors[slug].faintColorOnWhite;

    // Delete website if it's the same URL as repository
    const parsedWebsite = parseGitHubUrl(extension.website);
    const parsedRepo = parseGitHubUrl(extension.repository);
    if (
      parsedWebsite &&
      parsedRepo &&
      parsedWebsite.https_url === parsedRepo.https_url
    ) {
      delete extension.website;
    }

    extensions.push(extension);
  });

fs.writeFileSync(
  path.join(__dirname, "../index.json"),
  JSON.stringify(extensions, null, 2)
);
