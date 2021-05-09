const fs = require("fs");
const path = require("path");
const datesPath = path.join(__dirname, "../meta/dates.json");
const dates = require(datesPath);
const existingSlugs = Object.keys(dates);
const extensions = require("../lib/raw-extensions-list")();

console.log("Checking app submission dates...");

extensions
  .filter((extension) => existingSlugs.indexOf(extension.slug) === -1)
  .forEach((extension) => {
    const date = new Date().toISOString().slice(0, 10);
    console.log(`${extension.slug}: ${date}`);
    dates[extension.slug] = date;
  });

fs.writeFileSync(datesPath, JSON.stringify(dates, null, 2));
