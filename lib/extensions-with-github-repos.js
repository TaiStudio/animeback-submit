const extensions = require("./raw-extensions-list")();
const parseGitUrl = require("github-url-to-object");

module.exports = extensions.filter((extension) => {
  // inherit repository from website if possible
  if (!extension.repository && parseGitUrl(extension.website)) extension.repository = extension.website;
  if (!extension.repository) return false;
  if (!parseGitUrl(extension.repository)) return false;
  return true;
});
