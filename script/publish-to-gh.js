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
const packageJSON = require("../package.json");
const github = require("../lib/github");

async function main() {
  const name = `${packageJSON.name.replace("/", "-").replace("@", "")}-${
    packageJSON.version
  }.tgz`;
  const archivePath = path.resolve(__dirname, `../${name}`);

  if (!fs.existsSync(archivePath)) {
    return console.warn("[METRICS] Unable to find the archive");
  }

  const archiveStat = fs.statSync(archivePath);

  const { data: release } = await github.repos.createRelease({
    owner: "TaiStudio",
    repo: "animeback-submit",
    tag_name: `v${packageJSON.version}`,
  });

  await github.repos.uploadReleaseAsset({
    data: fs.readFileSync(archivePath),
    headers: {
      "content-length": archiveStat.size,
      "content-type": "application/gzip",
    },
    name,
    url: release.upload_url,
  });
}

main().catch((err) => {
  console.log(err);
  process.exit(1);
});
