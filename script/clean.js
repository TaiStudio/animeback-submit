// Clean up any files left behind by removed apps.
//
// When someone submits a PR to remove an app, only the `foo.yml` and `foo-icon.png`
// files are present in the repo. This script cleans up any leftover local
// artifacts that were created by `npm run build`, such as `apps/foo-icon-128.png`

const fs = require("fs");
const path = require("path");
const rimraf = require("rimraf").sync;

fs.readdirSync(path.join(__dirname, "../extensions"))
  .filter((filename) => {
    return fs
      .statSync(path.join(__dirname, `../extensions/${filename}`))
      .isDirectory();
  })
  .filter((filename) => {
    return !fs.existsSync(
      path.join(__dirname, `../extensions/${filename}/${filename}.json`)
    );
  })
  .forEach((filename) => {
    const extensionDir = path.join(__dirname, `../extensions/${filename}`);
    console.log(`Removing leftover artifacts from ${extensionDir}`);
    rimraf(extensionDir);
  });
