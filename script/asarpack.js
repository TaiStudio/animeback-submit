const fs = require("fs");
const path = require("path");
const asar = require("asar");
const extensions = require("../lib/raw-extensions-list")();
const rimraf = require("rimraf").sync;

console.log("Create extension submission asar file...");

extensions.forEach((extension) => {
  if (!fs.existsSync(extension.asarPath)) {
    var src = `extensions/${extension.slug}/${extension.slug}/files`;
    var dest = `${extension.asarPath}`;

    asar.createPackage(src, dest);

    rimraf(path.join(__dirname, src));
    console.log("done.");
  }
});
