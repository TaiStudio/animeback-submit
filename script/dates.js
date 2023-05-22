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
const datesPath = path.join(__dirname, "../meta/dates.json");
const dates = require(datesPath);
const existingSlugs = Object.keys(dates);
const extensions = require("../lib/raw-extensions-list")();

console.log("Checking extension submission dates...");

extensions
  .filter((extension) => existingSlugs.indexOf(extension.slug) === -1)
  .forEach((extension) => {
    const date = new Date().toISOString().slice(0, 10);
    console.log(`${extension.slug}: ${date}`);
    dates[extension.slug] = date;
  });

fs.writeFileSync(datesPath, JSON.stringify(dates, null, 2));
