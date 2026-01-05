/*-----------------------------------------------------------------------------------------\
|  _______                 _____  .               _                ___    ___/  ___    __  |
| '   /      ___  `       (      _/_   ,   .   ___/ `   __.       /   \ .'  /\ /   \ .'    |
|     |     /   ` |        `--.   |    |   |  /   | | .'   \        _-' |  / |   _-' |---. |
|     |    |    | |           |   |    |   | ,'   | | |    |       /    |,'  |  /    |   | |
|     /    `.__/| /      \___.'   \__/ `._/| `___,' /  `._.'      /___, /`---' /___, `._.' |
|                                                 `                                        |                                                                                                                                                                                                                                                 
\-----------------------------------------------------------------------------------------*/
const categories = require("./lib/extensions-categories");
const inquirer = require("inquirer");
const isUrl = require("is-url");
const path = require("path");
const fs = require("fs");
const slugify = require("slugg");
const mkdirp = require("mkdirp");
const cleanDeep = require("clean-deep");
const existingSlugs = fs.readdirSync(path.join(__dirname, "extensions"));
var createFile = require("create-file");

const questions = [
  {
    type: "input",
    name: "name",
    message: "What is the name of the extension?",
    validate: function (value) {
      if (!value) return "Please enter a name";
      const slug = slugify(value);
      if (existingSlugs.includes(slug))
        return `There is already an extension directory named '${slug}'.`;
      return true;
    },
  },
  {
    type: "input",
    name: "description",
    message: "Short description",
    validate: function (value) {
      if (!value) return "Please enter a description";
      if (value.length > 100) return `Too long! Try shortening: ${value}`;
      return true;
    },
  },
  {
    type: "input",
    name: "author",
    message: "Author name",
    validate: function (value) {
      if (!value) return "Please enter a author name";
      return true;
    },
  },
  {
    type: "input",
    name: "version",
    message: "Version number (example: 1.0.0)",
    validate: function (value) {
      if (!value) return "Please enter a version number";
      return true;
    },
  },
  {
    type: "input",
    name: "website",
    message: "Website (can be repository URL if extension has no website)",
    validate: function (value) {
      if (!isUrl(value)) return "Please enter a fully-qualified URL";
      return true;
    },
  },
  {
    type: "list",
    name: "category",
    message: "Extension category",
    choices: categories,
    validate: function (value) {
      if (!value) return "Please select a category";
    },
  },
  {
    type: "input",
    name: "repository",
    message: "Repository (optional)",
  },
  {
    type: "input",
    name: "keywords",
    message: "Keywords (optional, comma-delimited)",
    filter: function (value) {
      return value.split(",").map((keyword) => keyword.trim());
    },
  },
  {
    type: "input",
    name: "license",
    message: "License (optional)",
  },
];

inquirer
  .prompt(questions)
  .then(function (answers) {
    const extension = cleanDeep(answers);
    const slug = slugify(extension.name);
    const basepath = path.join(__dirname, `extensions/${slug}`);
    const jsonPath = path.join(basepath, `${slug}.json`);
    mkdirp(basepath);
    mkdirp(path.join(basepath, "files"));
    createFile(
      jsonPath,
      `${JSON.stringify(extension)} \r\n`,
      function (err) {},
    );
    console.log();
    console.log(`Yay! Created ${path.relative(process.cwd(), jsonPath)}`);
    console.log(`Now you just need to add an icon named ${slug}-icon.png\n`);
    console.log(
      `And add your extension files in ${path.relative(
        process.cwd(),
        basepath,
      )}\n`,
    );
    console.log(
      `Once you're done, run \`npm test\` to verify. Then open your pull request!`,
    );
    console.log();
  })
  .catch((error) => {
    console.error(error);
  });
