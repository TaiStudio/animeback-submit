#!/usr/bin/env bash

set -v            # print commands before execution, but don't expand env vars in output
set -o errexit    # always exit on error
set -o pipefail   # honor exit codes when piping
set -o nounset    # fail on unset variables

git clone "https://taistudio:$GH_TOKEN@github.com/TaiStudio/animeback-submit" app
cd app
npm ci

npm run test-all

# bail if nothing changed
if [ "$(git status --porcelain)" = "" ]; then
  echo "no new content found; goodbye!"
  exit
fi

git config user.email tai.studio@outlook.fr
git config user.name taistudio
git add .
git commit -am "update extensions" --author "Tai Studio <tai.studio@outlook.fr>"
npm version minor -m "bump minor to %s"
git pull --rebase
git push origin master
git push origin master --tags
echo //registry.npmjs.org/:_authToken=${NPM_AUTH_TOKEN} > .npmrc
npm publish
npm pack
node ./script/publish-to-gh.js
