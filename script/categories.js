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
const countArrayValues = require("count-array-values");
const slugg = require("slugg");
const extensions = require("../lib/raw-extensions-list")();

console.log("Generating a list of categories with counts...");

const categories = countArrayValues(
  extensions.map((extension) => extension.category),
  "name"
)
  .map((category) => Object.assign(category, { slug: slugg(category.name) }))
  .sort((a, b) => b.count - a.count);

fs.writeFileSync(
  path.join(__dirname, "../meta/categories.json"),
  JSON.stringify(categories, null, 2)
);
