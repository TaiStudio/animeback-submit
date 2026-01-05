/*-----------------------------------------------------------------------------------------\
|  _______                 _____  .               _                ___    ___/  ___    __  |
| '   /      ___  `       (      _/_   ,   .   ___/ `   __.       /   \ .'  /\ /   \ .'    |
|     |     /   ` |        `--.   |    |   |  /   | | .'   \        _-' |  / |   _-' |---. |
|     |    |    | |           |   |    |   | ,'   | | |    |       /    |,'  |  /    |   | |
|     /    `.__/| /      \___.'   \__/ `._/| `___,' /  `._.'      /___, /`---' /___, `._.' |
|                                                 `                                        |                                                                                                                                                                                                                                                 
\-----------------------------------------------------------------------------------------*/
"use strict";

const fs = require("fs");
const colorConvert = require("color-convert");
const sharp = require("sharp");
const mime = require("mime-types");
const path = require("path");
const pickAGoodColor = require("pick-a-good-color");

async function getColors(slugsAndIconPaths, oldColors, root) {
  const revHash = await import("rev-hash");

  return Promise.all(
    slugsAndIconPaths.map(async (extension) => {
      const slug = extension.slug;
      try {
        const data = fs.readFileSync(extension.iconPath);
        const hash = revHash.default(data);

        let o = oldColors[slug];
        if (o && o.source && o.source.revHash === hash) return { [slug]: o };

        console.info(`calculating good colors for ${slug}`);
        const image = sharp(data);
        const metadata = await image.metadata();
        const pixels = await image.raw().toBuffer({ resolveWithObject: true });

        const colors = [];

        for (let i = 0; i < metadata.width * metadata.height; i++) {
          const offset = i * 4;
          const r = pixels.data[offset];
          const g = pixels.data[offset + 1];
          const b = pixels.data[offset + 2];
          const hexColor = `#${colorConvert.rgb.hex([r, g, b])}`;
          colors.push(hexColor);
        }

        const goodColorOnWhite = pickAGoodColor(colors);
        const goodColorOnBlack = pickAGoodColor(colors, {
          background: "black",
        });
        const faintColorOnWhite = `rgba(${colorConvert.hex
          .rgb(goodColorOnWhite)
          .join(", ")}, 0.1)`;

        return {
          [slug]: {
            source: {
              revHash: hash,
              path: path.relative(root, extension.iconPath),
            },
            palette: colors,
            goodColorOnWhite,
            goodColorOnBlack,
            faintColorOnWhite,
          },
        };
      } catch (e) {
        console.error(`Error processing ${extension.iconPath}`, e);
      }
    }),
  ).then((values) => Object.assign({}, ...values));
}

const rebuildColorFile = (slugsAndIconPaths, colorsFile, root) => {
  let oldColors;
  try {
    oldColors = require(colorsFile);
  } catch (e) {
    oldColors = {};
  }

  getColors(slugsAndIconPaths, oldColors, root).then((colors) => {
    try {
      fs.writeFileSync(colorsFile, JSON.stringify(colors, null, 2));
    } catch (e) {
      console.error(`Error writing ${colorsFile}`, e);
    }
  });
};

module.exports = rebuildColorFile;
module.exports.getColors = getColors;
