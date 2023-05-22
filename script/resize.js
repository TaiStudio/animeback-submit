const sharp = require("sharp");
const path = require("path");
const fs = require("fs");
const recursiveReadSync = require("recursive-readdir-sync");

const icons = recursiveReadSync(path.join(__dirname, "../extensions")).filter(
  (file) => file.match(/icon\.png/)
);

process.stdout.write(`Resizing ${icons.length} icons...`);

(async function () {
  const imagemin = await import("imagemin");
  // const imageminPngquant = require('imagemin-pngquant')

  async function resize(file, size) {
    const newFile = file.replace(".png", `-${size}.png`);

    // skip files that are up to date
    if (
      fs.existsSync(newFile) &&
      fs.statSync(newFile).mtime > fs.statSync(file).mtime
    ) {
      return null;
    }

    const buffer = await sharp(fs.readFileSync(file))
      .resize(size, size, { fit: "inside" })
      .toFormat("png")
      .toBuffer();

    const optimizedBuffer = await imagemin.buffer(buffer);
    fs.writeFileSync(newFile, optimizedBuffer);
  }

  const resizes = icons
    .map((icon) => resize(icon, 32))
    .concat(icons.map((icon) => resize(icon, 64)))
    .concat(icons.map((icon) => resize(icon, 128)))
    .concat(icons.map((icon) => resize(icon, 256)));

  Promise.all(resizes)
    .then(function (results) {
      process.stdout.write(` Done.`);
      process.exit();
    })
    .catch(function (err) {
      console.error("Error resizing icons!");
      console.error(err);
      process.exit();
    });
})();
