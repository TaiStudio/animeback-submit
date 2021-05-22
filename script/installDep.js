const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const extensions = require("../lib/raw-extensions-list")();

console.log("Install extension dependencies...");

extensions.forEach((extension) => {
  if (!fs.existsSync(extension.asarPath)) {
    var src = path.join(__dirname, `../extensions/${extension.slug}/files`);

    exec(`cd ${src} && npm install`, (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
    });

    console.log("done.");
  }
});
