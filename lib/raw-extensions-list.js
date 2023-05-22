/*-----------------------------------------------------------------------------------------------------------\
|  _____     _   _____ _             _ _          _____  _____  _____  __      _______  _____  _____  _____  |
| |_   _|   (_) /  ___| |           | (_)        / __  \|  _  |/ __  \/  |    / / __  \|  _  |/ __  \|____ | |
|   | | __ _ _  \ `--.| |_ _   _  __| |_  ___    `' / /'| |/' |`' / /'`| |   / /`' / /'| |/' |`' / /'    / / |
|   | |/ _` | |  `--. \ __| | | |/ _` | |/ _ \     / /  |  /| |  / /   | |  / /   / /  |  /| |  / /      \ \ |
|   | | (_| | | /\__/ / |_| |_| | (_| | | (_) |  ./ /___\ |_/ /./ /____| |_/ /  ./ /___\ |_/ /./ /___.___/ / |
|   \_/\__,_|_| \____/ \__|\__,_|\__,_|_|\___/   \_____/ \___/ \_____/\___/_/   \_____/ \___/ \_____/\____/  |
\-----------------------------------------------------------------------------------------------------------*/
const fs = require("fs");
const path = require("path");

module.exports = function getSlugs() {
  return fs
    .readdirSync(path.join(__dirname, "../extensions"))
    .filter((filename) => {
      return fs
        .statSync(path.join(__dirname, `../extensions/${filename}`))
        .isDirectory();
    })
    .sort()
    .map((slug) => {
      const jsonFile = path.join(
        __dirname,
        `../extensions/${slug}/${slug}.json`
      );
      const extension = Object.assign(
        {
          slug: slug,
          iconPath: path.join(
            __dirname,
            `../extensions/${slug}/${slug}-icon.png`
          ),
          asarPath: path.join(__dirname, `../extensions/${slug}/${slug}.asar`),
        },
        fs.readFileSync(jsonFile)
      );
      return extension;
    });
};
