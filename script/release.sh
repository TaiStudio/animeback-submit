set -v
set -o errexit
set -o pipefail
set -o nounset

git clone "https://taistudio:$GH_TOKEN@github.com/TaiStudio/animeback-submit" app
cd app
npm ci

npm run test-all

if [ "$(git status --porcelain)" = "" ]; then
  echo "no new content found; goodbye!"
  exit
fi

git config user.email tai.studio@outlook.fr
git config user.name taistudio
git add .
git commit -am "update extensions" --author "AnimeBot <tai.studio@outlook.fr>"
npm version minor -m "bump minor to %s"
git pull --rebase
git push origin master
git push origin master --tags

npm publish
npm pack
node ./script/publish-to-gh.js
