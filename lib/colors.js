"use strict";

const fs = require("fs");
const colorConvert = require("color-convert");
const getImageColors = require("get-image-colors");
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
        return await getImageColors(data, mime.lookup(extension.iconPath)).then(
          (iconColors) => {
            const palette = iconColors.map((color) => color.hex());
            const goodColorOnWhite = pickAGoodColor(palette);
            const goodColorOnBlack = pickAGoodColor(palette, {
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
                palette,
                goodColorOnWhite,
                goodColorOnBlack,
                faintColorOnWhite,
              },
            };
          }
        );
      } catch (e) {
        console.error(`Error processing ${extension.iconPath}`, e);
      }
    })
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
