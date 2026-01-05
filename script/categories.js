/*-----------------------------------------------------------------------------------------\
|  _______                 _____  .               _                ___    ___/  ___    __  |
| '   /      ___  `       (      _/_   ,   .   ___/ `   __.       /   \ .'  /\ /   \ .'    |
|     |     /   ` |        `--.   |    |   |  /   | | .'   \        _-' |  / |   _-' |---. |
|     |    |    | |           |   |    |   | ,'   | | |    |       /    |,'  |  /    |   | |
|     /    `.__/| /      \___.'   \__/ `._/| `___,' /  `._.'      /___, /`---' /___, `._.' |
|                                                 `                                        |                                                                                                                                                                                                                                                 
\-----------------------------------------------------------------------------------------*/
const fs = require("fs");
const path = require("path");
const countArrayValues = require("count-array-values");
const slugg = require("slugg");
const extensions = require("../lib/raw-extensions-list")();

console.log("Generating a list of categories with counts...");

const categories = countArrayValues(
  extensions.map((extension) => extension.category),
  "name",
)
  .map((category) => Object.assign(category, { slug: slugg(category.name) }))
  .sort((a, b) => b.count - a.count);

fs.writeFileSync(
  path.join(__dirname, "../meta/categories.json"),
  JSON.stringify(categories, null, 2),
);
