const fs = require('fs')
const path = require('path')

module.exports = function getSlugs() {
  return fs
    .readdirSync(path.join(__dirname, '../extensions'))
    .filter((filename) => {
      return fs
        .statSync(path.join(__dirname, `../extensions/${filename}`))
        .isDirectory()
    })
    .sort()
    .map((slug) => {
      const jsonFile = path.join(__dirname, `../extensions/${slug}/${slug}.json`)
      const app = Object.assign(
        {
          slug: slug,
          iconPath: path.join(
            __dirname,
            `../extensions/${slug}/${slug}-icon.png`
          ),
        },
        fs.readFileSync(jsonFile)
      )
      return app
    })
}
