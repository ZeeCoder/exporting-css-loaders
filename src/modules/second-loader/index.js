const utils = require("../css-loader-utils");

module.exports = function(source, map) {
  if (this.cacheable) {
    this.cacheable();
  }

  const meta = utils.normaliseMeta(source);

  meta.moduleParts.push('export const second = {someData: "from the second loader"}');

  this.callback(null, meta, map);
};
