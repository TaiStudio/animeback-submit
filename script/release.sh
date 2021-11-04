#!/usr/bin/env bash

set -v            # print commands before execution, but don't expand env vars in output
set -o errexit    # always exit on error
set -o pipefail   # honor exit codes when piping
set -o nounset    # fail on unset variables

git clone "https://AnimeBack-Bot:$GH_TOKEN@github.com/TaiStudio/animeback-submit" extension
cd extension
npm install

npm run test-all

# bail if nothing changed
if [ "$(git status --porcelain)" = "" ]; then
  echo "no new content found; goodbye!"
  exit
fi

git config user.email animebot.tai.studio@outlook.fr
git config user.name AnimeBack-Bot
git add .
git commit -am "🤖✔️ update extensions" --author "AnimeBack-Bot <animebot.tai.studio@outlook.fr>"
npm version minor -m "bump minor to %s"
git pull --rebase
git push origin master
git push origin master --tags
echo //registry.npmjs.org/:_authToken=${NPM_AUTH_TOKEN} > .npmrc
npm publish --access public
npm pack
node ./script/publish-to-gh.js
