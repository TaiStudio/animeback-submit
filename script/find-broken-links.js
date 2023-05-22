#!/usr/bin/env node
/*-----------------------------------------------------------------------------------------------------------\
|  _____     _   _____ _             _ _          _____  _____  _____  __      _______  _____  _____  _____  |
| |_   _|   (_) /  ___| |           | (_)        / __  \|  _  |/ __  \/  |    / / __  \|  _  |/ __  \|____ | |
|   | | __ _ _  \ `--.| |_ _   _  __| |_  ___    `' / /'| |/' |`' / /'`| |   / /`' / /'| |/' |`' / /'    / / |
|   | |/ _` | |  `--. \ __| | | |/ _` | |/ _ \     / /  |  /| |  / /   | |  / /   / /  |  /| |  / /      \ \ |
|   | | (_| | | /\__/ / |_| |_| | (_| | | (_) |  ./ /___\ |_/ /./ /____| |_/ /  ./ /___\ |_/ /./ /___.___/ / |
|   \_/\__,_|_| \____/ \__|\__,_|\__,_|_|\___/   \_____/ \___/ \_____/\___/_/   \_____/ \___/ \_____/\____/  |
\-----------------------------------------------------------------------------------------------------------*/

const findBrokenLinks = require("../lib/broken-links");

/* Links can break at any time and it's outside of the repo's control,
   so it doesn't make sense to run this script as part of CI. Instead,
   this should be run periodically as part of a separate process. */

/* TODO: should this do anything corrective as well?
   e.g. if all the links in a file are dead, disable the file? */

process.on("unhandledRejection", (reason, p) => {
  console.log("Unhandled Rejection at: Promise", p, "reason:", reason);
});

const numberArgs = process.argv.filter((v) => /^\d+$/.test(v));
const possibleStart =
  numberArgs.length > 0 ? parseInt(numberArgs[0], 10) : undefined;
const possibleEnd =
  numberArgs.length > 0 ? parseInt(numberArgs[1], 10) : undefined;

console.log(
  `Checking extensions ${possibleStart || 0} through ${
    possibleEnd || "infinity"
  } for broken links`
);

findBrokenLinks(possibleStart, possibleEnd)
  .then((failArrays) => {
    console.log(`${failArrays.length} failure groups`);
    return failArrays.flat();
  })
  .then((fails) => process.exit(fails.length));
