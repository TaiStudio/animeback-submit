const fs = require("fs");
const asar = require("asar");
const extensions = require("../lib/raw-extensions-list")();
const rimraf = require("rimraf").sync;

console.log("Create extension submission asar file...");

extensions.forEach((extension) => {
  console.log(`${JSON.stringify(extension)}`);
  if (!fs.existsSync(extension.asarPath)) {
    var src = `extensions/${extension.slug}/${extension.slug}/files`;
    var dest = `${extension.asarPath}`;

    asar.createPackage(src, dest);

    rimraf(src);
    console.log("done.");
  }
});
