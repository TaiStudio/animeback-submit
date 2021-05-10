const fs = require("fs");
const path = require("path");
const asar = require("asar");
const extensions = require("../lib/raw-extensions-list")();

console.log("Create extension submission asar file...");

extensions.forEach((extension) => {
  if (!fs.existsSync(extension.asarPath)) {
    var src = path.join(__dirname, `../extensions/${extension.slug}/files`);
    var dest = `${extension.asarPath}`;

    asar.createPackage(src, dest);

    console.log("done.");
  }
});
