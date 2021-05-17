#!/usr/bin/env bash

set -v            # print commands before execution, but don't expand env vars in output
set -o errexit    # always exit on error
set -o pipefail   # honor exit codes when piping
set -o nounset    # fail on unset variables

git clone "https://AnimeBack-Bot:$GH_TOKEN@github.com/TaiStudio/animeback-submit" update
cd update
npm ci

npm update

npm upgrade


# bail if nothing changed
if [ "$(git status --porcelain)" = "" ]; then
  echo "no new content found; goodbye!"
  npm start
fi

git config user.email animebot.tai.studio@outlook.fr
git config user.name AnimeBack-Bot
git add .
git commit -am "update version" --author "AnimeBack-Bot <animebot.tai.studio@outlook.fr>"
git pull --rebase
git push origin master
git push origin master --tags
