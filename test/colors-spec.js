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
const os = require("os");
const path = require("path");
const sinon = require("sinon");

const chai = require("chai");
const { PNG } = require("pngjs");
const tinyColor = require("tinycolor2");

chai.should();

const expect = chai.expect;

const Colors = require("../lib/colors.js");

describe("colors", function () {
  let consoleInfo;
  let consoleError;
  let testDir;
  let slugsAndIconPaths;

  const colors = ["white", "black"];

  beforeEach(async function () {
    slugsAndIconPaths = [];
    testDir = fs.mkdtempSync(path.join(os.tmpdir(), "colors-spec-"));

    for (const colorName of colors) {
      const c = parseInt(tinyColor(colorName).toHex8(), 16);
      const png = new PNG({ width: 2, height: 2 });
      for (let y = 0; y < png.height; y++) {
        for (let x = 0; x < png.width; x++) {
          const idx = (png.width * y + x) << 2;
          png.data[idx] = (c >> 24) & 0xff;
          png.data[idx + 1] = (c >> 16) & 0xff;
          png.data[idx + 2] = (c >> 8) & 0xff;
          png.data[idx + 3] = c & 0xff;
        }
      }
      const iconPath = path.join(testDir, colorName + ".png");
      await new Promise((resolve, reject) =>
        png
          .pack()
          .pipe(fs.createWriteStream(iconPath))
          .on("finish", resolve)
          .on("error", reject),
      );
      fs.chmodSync(iconPath, 511);
      slugsAndIconPaths.push({ slug: colorName, iconPath });
    }

    consoleError = sinon.stub(console, "error");
    consoleInfo = sinon.stub(console, "info");
  });

  afterEach(() => {
    for (const entry of fs.readdirSync(testDir)) {
      fs.unlinkSync(path.resolve(testDir, entry));
    }
    fs.rmdirSync(testDir);

    consoleError.restore();
    consoleInfo.restore();
  });

  it("should create entries with the expected properties", async () => {
    const entry = slugsAndIconPaths[0];
    const colors = await Colors.getColors([entry], {}, testDir);
    colors.should.have
      .keys(entry.slug)
      .and.property(entry.slug)
      .has.all.keys(
        "source",
        "faintColorOnWhite",
        "goodColorOnBlack",
        "goodColorOnWhite",
        "palette",
      )
      .and.property("source")
      .has.all.keys("path", "revHash")
      .and.property("path")
      .equals(path.basename(entry.iconPath));
  }).timeout(5000);

  it("should add an entry when a new extension is added", async () => {
    const oldColors = await Colors.getColors(
      slugsAndIconPaths.slice(0, 1),
      {},
      testDir,
    );
    const newColors = await Colors.getColors(
      slugsAndIconPaths.slice(0, 2),
      oldColors,
      testDir,
    );
    newColors.should.deep.contain(oldColors);
    oldColors.should.not.deep.contain(newColors);
    expect(consoleInfo.callCount).to.equal(2);
  });

  it("should remove an entry when an extension is removed", async () => {
    const oldColors = await Colors.getColors(
      slugsAndIconPaths.slice(0, 2),
      {},
      testDir,
    );
    const newColors = await Colors.getColors(
      slugsAndIconPaths.slice(0, 1),
      oldColors,
      testDir,
    );
    newColors.should.not.deep.contain(oldColors);
    oldColors.should.deep.contain(newColors);
    expect(consoleInfo.callCount).to.equal(2);
  });

  it("should create reproducible output", async () => {
    const a = await Colors.getColors(slugsAndIconPaths, {}, testDir);
    const b = await Colors.getColors(slugsAndIconPaths, {}, testDir);
    a.should.deep.equal(b);
    expect(consoleInfo.callCount).to.equal(4);
  });

  it("should skip entries whose icons are unreadable", async () => {
    const badEntry = slugsAndIconPaths[0];
    const goodEntry = slugsAndIconPaths[1];
    const input = [badEntry, goodEntry];

    fs.unlinkSync(badEntry.iconPath);

    const colors = await Colors.getColors(input, {}, testDir);
    colors.should.have.keys(goodEntry.slug).and.not.have.keys(badEntry.slug);

    expect(consoleError.callCount).to.equal(1);
    expect(consoleError.firstCall.args[0]).to.include(badEntry.iconPath);

    expect(consoleInfo.callCount).to.equal(1);
  });

  it("should skip entries whose icons are unparsable", async () => {
    const entries = slugsAndIconPaths.map((original) =>
      Object.create(original),
    );
    const badEntry = entries[0];
    const goodEntry = entries[1];
    badEntry.iconPath = path.join(testDir, "hello.png");
    fs.writeFileSync(
      badEntry.iconPath,
      "This is a text file! The file suffix is wrong!\n",
    );

    const colors = await Colors.getColors(entries, {}, testDir);
    colors.should.have.keys(goodEntry.slug).and.not.have.keys(badEntry.slug);

    expect(consoleError.callCount).to.equal(1);
    expect(consoleError.firstCall.args[0]).to.include(badEntry.iconPath);

    expect(consoleInfo.callCount).to.equal(2);
  });

  it("should update revHashes when icon files change", async () => {
    let entries = slugsAndIconPaths.map((original) => Object.create(original));
    const oldColors = await Colors.getColors(entries, {}, testDir);

    entries = slugsAndIconPaths.map((original) => Object.create(original));
    const changedEntry = entries[0];
    const unchangedEntry = entries[1];
    changedEntry.iconPath = unchangedEntry.iconPath;
    const newColors = await Colors.getColors(entries, oldColors, testDir);

    expect(newColors)
      .property(unchangedEntry.slug)
      .to.deep.contain(oldColors[unchangedEntry.slug]);

    expect(newColors)
      .property(changedEntry.slug)
      .property("source")
      .property("revHash")
      .should.not.equal(oldColors[changedEntry.slug].source.revHash);

    expect(consoleInfo.callCount).to.equal(3);
  });
});
