/*-----------------------------------------------------------------------------------------------------------\
|  _____     _   _____ _             _ _          _____  _____  _____  __      _______  _____  _____  _____  |
| |_   _|   (_) /  ___| |           | (_)        / __  \|  _  |/ __  \/  |    / / __  \|  _  |/ __  \|____ | |
|   | | __ _ _  \ `--.| |_ _   _  __| |_  ___    `' / /'| |/' |`' / /'`| |   / /`' / /'| |/' |`' / /'    / / |
|   | |/ _` | |  `--. \ __| | | |/ _` | |/ _ \     / /  |  /| |  / /   | |  / /   / /  |  /| |  / /      \ \ |
|   | | (_| | | /\__/ / |_| |_| | (_| | | (_) |  ./ /___\ |_/ /./ /____| |_/ /  ./ /___\ |_/ /./ /___.___/ / |
|   \_/\__,_|_| \____/ \__|\__,_|\__,_|_|\___/   \_____/ \___/ \_____/\___/_/   \_____/ \___/ \_____/\____/  |
\-----------------------------------------------------------------------------------------------------------*/
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");
const recursiveReadSync = require("recursive-readdir-sync");
const imagemin = require("imagemin");

async function resize(file, size) {
  const newFile = file.replace(".png", `-${size}.png`);

  // skip files that are up to date
  if (
    fs.existsSync(newFile) &&
    fs.statSync(newFile).mtime > fs.statSync(file).mtime
  ) {
    return Promise.resolve(null);
  }

  return sharp(fs.readFileSync(file))
    .resize(size, size, { fit: "inside" })
    .toFormat("png")
    .toBuffer()
    .then((buf) => imagemin.buffer(buf))
    .then((buf) => fs.writeFileSync(newFile, buf));
}

async function main() {
  const icons = recursiveReadSync(path.join(__dirname, "../extensions")).filter(
    (file) => file.match(/icon\.png/)
  );

  console.log(`Resizing ${icons.length} icons...`);
  const resizes = icons.reduce((acc, icon) => {
    const iconName = path.basename(icon);

    return {
      ...acc,
      [iconName]: [
        resize(icon, 32),
        resize(icon, 64),
        resize(icon, 128),
        resize(icon, 256),
      ],
    };
  }, {});

  for (const icon in resizes) {
    const promises = await Promise.allSettled(Object.values(resizes[icon]));
    const failed = promises.filter((p) => p.status === "rejected");

    if (failed.length > 0) {
      console.error(`🔴 Failed to resize icons for icon "${icon}"!`);
      for (const { reason } of failed) {
        console.log(reason);
      }
      process.exit(1);
    }
  }
}

main();
