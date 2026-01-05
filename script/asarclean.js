/*-----------------------------------------------------------------------------------------\
|  _______                 _____  .               _                ___    ___/  ___    __  |
| '   /      ___  `       (      _/_   ,   .   ___/ `   __.       /   \ .'  /\ /   \ .'    |
|     |     /   ` |        `--.   |    |   |  /   | | .'   \        _-' |  / |   _-' |---. |
|     |    |    | |           |   |    |   | ,'   | | |    |       /    |,'  |  /    |   | |
|     /    `.__/| /      \___.'   \__/ `._/| `___,' /  `._.'      /___, /`---' /___, `._.' |
|                                                 `                                        |                                                                                                                                                                                                                                                 
\-----------------------------------------------------------------------------------------*/
const fs = require("fs");
const path = require("path");
const extensions = require("../lib/raw-extensions-list")();

function removeFileOrFolder(path) {
  if (fs.existsSync(path)) {
    const stats = fs.statSync(path);
    if (stats.isFile()) {
      fs.unlinkSync(path);
    } else {
      fs.readdirSync(path).forEach((file) => {
        const curPath = `${path}/${file}`;
        if (fs.lstatSync(curPath).isDirectory()) {
          removeFileOrFolder(curPath);
        } else {
          fs.unlinkSync(curPath);
        }
      });
      fs.rmdirSync(path);
    }
  }
}

console.log("Clean extension submission files dir...");

extensions.forEach((extension) => {
  var src = path.join(__dirname, `../extensions/${extension.slug}/files`);
  if (fs.existsSync(src)) {
    removeFileOrFolder(src);

    console.log("done.");
  }
});
