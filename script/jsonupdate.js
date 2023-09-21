/*-----------------------------------------------------------------------------------------------------------\
|  _____     _   _____ _             _ _          _____  _____  _____  __      _______  _____  _____  _____  |
| |_   _|   (_) /  ___| |           | (_)        / __  \|  _  |/ __  \/  |    / / __  \|  _  |/ __  \|____ | |
|   | | __ _ _  \ `--.| |_ _   _  __| |_  ___    `' / /'| |/' |`' / /'`| |   / /`' / /'| |/' |`' / /'    / / |
|   | |/ _` | |  `--. \ __| | | |/ _` | |/ _ \     / /  |  /| |  / /   | |  / /   / /  |  /| |  / /      \ \ |
|   | | (_| | | /\__/ / |_| |_| | (_| | | (_) |  ./ /___\ |_/ /./ /____| |_/ /  ./ /___\ |_/ /./ /___.___/ / |
|   \_/\__,_|_| \____/ \__|\__,_|\__,_|_|\___/   \_____/ \___/ \_____/\___/_/   \_____/ \___/ \_____/\____/  |
\-----------------------------------------------------------------------------------------------------------*/
const categories = require("../lib/extensions-categories");
const fs = require("fs");
const path = require("path");
const slugs = fs
  .readdirSync(path.join(__dirname, "../extensions"))
  .filter((filename) => {
    return fs
      .statSync(path.join(__dirname, `../extensions/${filename}`))
      .isDirectory();
  });

const keywordMappings = {
  book: "Books",
  ebook: "Books",
  facebook: "Social Networking",
  graphics: "Photo & Video",
  photo: "Photo & Video",
  "photo-manager": "Photo & Video",
  photos: "Photo & Video",
  photoshop: "Photo & Video",
  video: "Photo & Video",
  "video editing": "Photo & Video",
  "video editor": "Photo & Video",
  "video viewer": "Photo & Video",
  videos: "Photo & Video",
  editor: "Productivity",
  menubar: "Utilities",
  note: "Productivity",
  notes: "Productivity",
  utility: "Utilities",
  util: "Utilities",
  launcher: "Utilities",
  browser: "Productivity",
  "web browser": "Productivity",
  excel: "Productivity",
  design: "Productivity",
  search: "Utilities",
  messaging: "Social Networking",
  chat: "Social Networking",
  collaboration: "Social Networking",
  screenshot: "Utilities",
  clipboard: "Utilities",
  bitcoin: "Finance",
  markdown: "Productivity",
  notebook: "Productivity",
  youtube: "Photo & Video",
  pdf: "Productivity",
  aggregator: "Utilities",
  comic: "Books",
  comics: "Books",
  manager: "Utilities",
  translation: "Utilities",
  google: "Productivity",
  email: "Productivity",
  twitter: "Social Networking",
  "3d printing": "Utilities",
  children: "Education",
  encryption: "Utilities",
  webinar: "Business",
  "music client": "Music",
  "music player": "Music",
  podcasts: "News",
  utorrent: "Utilities",
  torrent: "Utilities",
  "periodic-table": "Utilities",
  art: "Photo & Video",
  hardware: "Utilities",
  webgl: "Photo & Video",
  svg: "Photo & Video",
  collections: "Productivity",
  bookmarking: "Productivity",
  "blog editor": "Productivity",
  media: "Photo & Video",
  kanban: "Productivity",
  onenote: "Productivity",
  photography: "Photo & Video",
  medicine: "Medical",
  "productivity tool": "Productivity",
  system: "Utilities",
  tournament: "Games",
  webrtc: "Social Networking",
  trading: "Finance",
  images: "Photo & Video",
  time: "Productivity",
  gif: "Photo & Video",
};

const keywordCounts = {};
const usedCategories = {};

function determineCategory(extension, jsonPath) {
  let guessingKeywords = false;
  let updatejson = false;
  let matched = false;
  let matchedKeyword;

  if (!extension.keywords) {
    extension.keywords = extension.description.split(" ");
    guessingKeywords = true;
  }

  extension.keywords.some((keyword, index) => {
    matched = categories.find((category) => {
      if (keyword.toLowerCase() === category.toLowerCase()) {
        matchedKeyword = keyword;
        return true;
      }
    });
    return matched;
  });
  if (!matched) {
    // look in mappings
    extension.keywords.some((keyword, index) => {
      let lowerKeyword = keyword.toLowerCase();
      if (keywordMappings[lowerKeyword]) {
        matched = keywordMappings[lowerKeyword];
        matchedKeyword = keyword;
        return true;
      } else {
        return false;
      }
    });
  }

  if (matched) {
    extension.category = matched;
    updatejson = true;
    if (!usedCategories[matched]) {
      usedCategories[matched] = 1;
    } else {
      usedCategories[matched]++;
    }
  }
  if (!updatejson) {
    extension.keywords.forEach((keyword) => {
      let lowerKeyword = keyword.toLowerCase();
      if (keywordCounts[lowerKeyword]) {
        keywordCounts[lowerKeyword]++;
      } else {
        keywordCounts[lowerKeyword] = 1;
      }
    });
  }

  if (updatejson) {
    if (guessingKeywords) {
      extension.keywords = [matchedKeyword];
      console.log(
        `SUCCESS ${extension.name} has been given ${extension.category} by guessing keyword: ${matchedKeyword}`,
      );
    } else {
      console.log(
        `SUCCESS ${extension.name} has been given ${extension.category} by using keyword: ${matchedKeyword}`,
      );
    }
    savejson(extension, jsonPath);
  } else {
    if (guessingKeywords) {
      console.log(
        `${extension.name} does not have keywords, its description is: ${extension.description}.`,
      );
    } else {
      console.log(
        `Could not find category for ${
          extension.name
        }, keywords are: ${extension.keywords.join(",")}, description is: ${
          extension.description
        }`,
      );
    }
  }
}

function savejson(extension, jsonPath) {
  const jsonContent = json.stringify(extension, 2);
  fs.writeFileSync(jsonPath, jsonContent);
}

slugs.forEach((slug) => {
  const basedir = path.join(__dirname, `../extensions/${slug}`);
  const jsonFile = `${slug}.json`;
  const jsonPath = path.join(basedir, jsonFile);
  let extension;
  let data;

  try {
    data = fs.readFileSync(jsonPath, { encoding: "utf-8" });
    extension = json.parse(data);
  } catch (err) {
    console.log(`Error loading ${jsonPath}`, err);
  }
  if (!extension.category) {
    determineCategory(extension, jsonPath);
  }
});

let tags = [];
Object.keys(keywordCounts).forEach((keyword) => {
  tags.push({
    tagName: `${keyword}`,
    count: keywordCounts[keyword],
  });
});
tags.sort((a, b) => {
  return b.count - a.count;
});

console.log(`Used categories: ${JSON.stringify(usedCategories, null, 2)}`);
console.log(
  `Keywords unmapped to categories: ${JSON.stringify(tags, null, 2)}`,
);
