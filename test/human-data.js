/*-----------------------------------------------------------------------------------------\
|  _______                 _____  .               _                ___    ___/  ___    __  |
| '   /      ___  `       (      _/_   ,   .   ___/ `   __.       /   \ .'  /\ /   \ .'    |
|     |     /   ` |        `--.   |    |   |  /   | | .'   \        _-' |  / |   _-' |---. |
|     |    |    | |           |   |    |   | ,'   | | |    |       /    |,'  |  /    |   | |
|     /    `.__/| /      \___.'   \__/ `._/| `___,' /  `._.'      /___, /`---' /___, `._.' |
|                                                 `                                        |                                                                                                                                                                                                                                                 
\-----------------------------------------------------------------------------------------*/
const categories = require("../lib/extensions-categories");
const mocha = require("mocha");
const describe = mocha.describe;
const it = mocha.it;
const fs = require("fs");
const path = require("path");
const expect = require("chai").expect;
const isUrl = require("is-url");
const { URL } = require("url");
const cleanDeep = require("clean-deep");
const imageSize = require("image-size");
const makeColorAccessible = require("make-color-accessible");
const slugg = require("slugg");
const grandfatheredDescriptions = require("../lib/grandfathered-descriptions");
const grandfatheredLinks = require("../lib/grandfathered-links.js");
const grandfatheredSlugs = require("../lib/grandfathered-small-icons");
const slugs = fs
  .readdirSync(path.join(__dirname, "../extensions"))
  .filter((filename) => {
    return fs
      .statSync(path.join(__dirname, `../extensions/${filename}`))
      .isDirectory();
  });

describe("human-submitted extension data", () => {
  it("includes lots of extensions", () => {
    expect(slugs.length).to.be.above(0);
  });

  slugs.forEach((slug) => {
    describe(slug, () => {
      const basedir = path.join(__dirname, `../extensions/${slug}`);
      const jsonFile = `${slug}.json`;
      const jsonPath = path.join(basedir, jsonFile);
      const iconPath = path.join(basedir, `${slug}-icon.png`);

      it("is in a directory whose name is lowercase with dashes as a delimiter", () => {
        expect(slugg(slug)).to.equal(slug);
      });

      it(`includes a data file named ${slug}.json`, () => {
        expect(fs.existsSync(jsonPath)).to.equal(true);
      });

      describe(`${jsonFile}`, () => {
        const extension = require(jsonPath);

        it("has a name", () => {
          expect(extension.name.length).to.be.above(0);
        });

        describe("description", () => {
          it("exists", () => {
            expect(extension.description.length).to.be.above(0);
          });

          it("should not start with extension name", () => {
            const extensionName = extension.name.toLowerCase();
            const description = extension.description.toLowerCase();
            expect(description).to.satisfy(
              (desc) => !desc.startsWith(extensionName),
            );
          });

          const descIsGrandfathered = grandfatheredDescriptions.includes(slug);
          if (!descIsGrandfathered) {
            it("should start with a capital letter", () => {
              const firstLetter = extension.description[0];
              expect(firstLetter).to.equal(firstLetter.toUpperCase());
            });

            it("should end with a period / full stop", () => {
              expect(
                extension.description[extension.description.length - 1],
              ).to.equal(
                ".",
                `Description should end in a period / full stop: '${extension.description}'`,
              );
            });

            it('should not start description with "A" or "An"', () => {
              const descriptionFirstWord = extension.description
                .toLowerCase()
                .split(" ", 1)[0];
              const badStarts = ["a", "an"];
              expect(badStarts).to.not.include(
                descriptionFirstWord,
                `Description should not start with 'A' or 'An': '${extension.description}'`,
              );
            });
          }
        });

        const linksAreGrandfathered = grandfatheredLinks.includes(slug);
        if (!linksAreGrandfathered) {
          // walk an object subtree looking for URLs
          const getObjectUrls = (root) => {
            const found = [];
            const queue = [root];
            while (queue.length !== 0) {
              const vals = Object.values(queue.shift());
              found.push(...vals.filter(isUrl).map((v) => new URL(v)));
              queue.push(...vals.filter((v) => typeof v === "object"));
            }
            return found;
          };

          it("should use ssl links", () => {
            const goodProtocols = ["https:", "sftp:"];
            const urls = getObjectUrls(extension);

            urls.forEach((url) =>
              expect(url.protocol, url).to.be.oneOf(goodProtocols),
            );
          });
        }

        it("has a website with a valid URL (or no website)", () => {
          expect(!extension.website || isUrl(extension.website)).to.equal(true);
        });

        it("has a valid repository URL (or no repository)", () => {
          expect(!extension.repository || isUrl(extension.repository)).to.equal(
            true,
          );
        });

        describe("keywords", () => {
          it("should, if present, be an array of keywords", () => {
            expect(extension.keywords || []).to.be.an("array");
          });

          it("should not include duplicates", () => {
            const keywords = extension.keywords || [];
            expect(keywords.sort().toString()).to.equal(
              [...new Set(keywords).values()].sort().toString(),
            );
          });
        });

        it("has a valid category", () => {
          expect(extension.category.length).to.be.above(0);
          expect(extension.category).to.be.oneOf(categories);
        });

        describe("colors", () => {
          it(`allows goodColorOnWhite to be set, but it must be accessible`, () => {
            // accessible: contrast ratio of 4.5:1 or greater (white background)
            const color = extension.goodColorOnWhite;
            if (color) {
              const accessibleColor = makeColorAccessible(color);
              expect(color === accessibleColor).to.equal(
                true,
                `${slug}: contrast ratio too low for goodColorOnWhite. Try: ${accessibleColor}`,
              );
            }
          });

          it(`allows goodColorOnBlack to be set, but it must be accessible`, () => {
            // accessible: contrast ratio of 4.5:1 or greater (black background)
            const color = extension.goodColorOnBlack;
            if (color) {
              const accessibleColor = makeColorAccessible(color, {
                background: "black",
              });
              expect(color === accessibleColor).to.equal(
                true,
                `${slug}: contrast ratio too low for goodColorOnBlack. Try: ${accessibleColor}`,
              );
            }
          });

          it(`allows faintColorOnWhite to be set`, () => {
            const color = extension.faintColorOnWhite;
            if (color) {
              expect(color).to.match(
                /rgba\(\d+, \d+, \d+, /,
                `${slug}'s faintColorOnWhite must be an rgba string`,
              );
            }
          });
        });

        it("has no empty properties", () => {
          expect(cleanDeep(extension)).to.deep.equal(extension);
        });

        describe("screenshots", () => {
          const screenshots = extension.screenshots || [];

          it("requires imageUrl to be a fully-qualified HTTPS URL", () => {
            screenshots.forEach((screenshot) => {
              expect(
                isUrl(screenshot.imageUrl) &&
                  /^https/.test(screenshot.imageUrl),
              ).to.equal(
                true,
                `${extension.slug} screenshot imageUrl must be a fully-qualified HTTPS URL`,
              );
            });
          });

          it("requires linkUrl to be a fully-qualified URL, if present", () => {
            screenshots.forEach((screenshot) => {
              expect(!screenshot.linkUrl || isUrl(screenshot.linkUrl)).to.equal(
                true,
                `${extension.slug} screenshot linkURL must be a fully qualified URL`,
              );
            });
          });
        });

        it("has a valid YouTube URL (or none)", () => {
          expect(
            !extension.youtube_video_url || isUrl(extension.youtube_video_url),
          ).to.equal(true);
        });
      });

      describe("icon", () => {
        it(`exists as ${slug}-icon.png`, () => {
          expect(fs.existsSync(iconPath)).to.equal(
            true,
            `${slug}-icon.png not found`,
          );
        });

        it("is a square", function () {
          if (!fs.existsSync(iconPath)) return this.skip();

          const dimensions = imageSize(iconPath);
          expect(dimensions.width).to.be.a("number");
          expect(dimensions.width).to.equal(dimensions.height);
        });

        const minPixels = grandfatheredSlugs.indexOf(slug) > -1 ? 128 : 256;
        const maxPixels = 1024;

        it(`is between ${minPixels}px x ${minPixels}px and ${maxPixels}px x ${maxPixels}px`, function () {
          if (!fs.existsSync(iconPath)) return this.skip();
          const dimensions = imageSize(iconPath);
          expect(dimensions.width).to.be.within(minPixels, maxPixels);
          expect(dimensions.height).to.be.within(minPixels, maxPixels);
        });
      });
    });
  });
});
