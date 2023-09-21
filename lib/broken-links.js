/*-----------------------------------------------------------------------------------------------------------\
|  _____     _   _____ _             _ _          _____  _____  _____  __      _______  _____  _____  _____  |
| |_   _|   (_) /  ___| |           | (_)        / __  \|  _  |/ __  \/  |    / / __  \|  _  |/ __  \|____ | |
|   | | __ _ _  \ `--.| |_ _   _  __| |_  ___    `' / /'| |/' |`' / /'`| |   / /`' / /'| |/' |`' / /'    / / |
|   | |/ _` | |  `--. \ __| | | |/ _` | |/ _ \     / /  |  /| |  / /   | |  / /   / /  |  /| |  / /      \ \ |
|   | | (_| | | /\__/ / |_| |_| | (_| | | (_) |  ./ /___\ |_/ /./ /____| |_/ /  ./ /___\ |_/ /./ /___.___/ / |
|   \_/\__,_|_| \____/ \__|\__,_|\__,_|_|\___/   \_____/ \___/ \_____/\___/_/   \_____/ \___/ \_____/\____/  |
\-----------------------------------------------------------------------------------------------------------*/
const fetch = require("node-fetch");
const fsPromises = require("fs").promises;
const isUrl = require("is-url");
const path = require("path");
const readdirp = require("readdirp");

const topDir = path.dirname(__dirname);

// walk an object subtree looking for URL strings
const getObjectUrls = (root) => {
  const urls = [];
  const queue = [root];
  while (queue.length !== 0) {
    const vals = Object.values(queue.shift());
    urls.push(...vals.filter(isUrl));
    queue.push(...vals.filter((v) => typeof v === "object"));
  }
  return urls;
};

// scrape a url to see if the link is broken.
// return a Promise that resolves as { url, err }
const scrape = (url) =>
  fetch(url, { method: "HEAD" }) // just scrape headers; body not needed
    .then(
      (res) => ({
        url,
        err: res.ok ? null : `${res.status} ${res.statusText}`,
        status: res.status,
      }),
      (err) => ({ url, err, status: -2 }),
    );

// scrape all the urls found in a json file.
// report broken links to console.log().
// return a Promise that resolves as an array of broken links: [ { url, err }, ... ]
const processjsonEntry = (entry) =>
  fsPromises
    .readFile(entry.fullPath, { encoding: "utf8" })
    .then((file) => {
      try {
        return JSON.parse(file);
      } catch (error) {
        console.error(`Failed to parse ${entry.path}. Skipping.`);
        return { disabled: true };
      }
    })
    .then((o) => (o.disabled ? [] : getObjectUrls(o)))
    .then(async (urls) => {
      const results = [];

      for (const url of urls) {
        // Scrape one by one to handle rate limiting
        const r = await scrape(url);
        results.push(r);
      }

      return results;
    })
    .then((results) => results.filter((res) => !!res.err))
    .then((fails) => {
      fails.forEach((f) => console.log(`${entry.path} - ${f.url} (${f.err})`));
      return fails;
    });

const findBrokenLinks = (start = 0, end = Infinity) =>
  readdirp
    .promise(topDir, {
      fileFilter: "*.json",
      directoryFilter: (entry) => entry.path.startsWith("extensions"),
    })
    .then(async (entries) => {
      const result = [];
      let limitedEntries = entries;

      if (start !== 0 || end !== Infinity) {
        limitedEntries = entries.slice(start, end);
      }

      for (const entry of limitedEntries) {
        console.log(`Processing ${entry.path}`);
        result.push({
          entry,
          result: await processjsonEntry(entry),
        });
      }

      return result;
    })
    .then((arr) => arr.filter((inner) => !!inner.result.length));

module.exports = findBrokenLinks;
