const fs = require("fs");
const path = require("path");
const extensions = require("../lib/raw-extensions-list")();
const rimraf = require("rimraf").sync;

console.log("Clean extension submission files dir...");

extensions.forEach((extension) => {
  var src = path.join(__dirname, `../extensions/${extension.slug}/files`);
  if (fs.existsSync(src)) {
    rimraf(src);

    console.log("done.");
  }
});
