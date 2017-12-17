const utils = require("../css-loader-utils");

module.exports = function(source, map) {
  if (this.cacheable) {
    this.cacheable();
  }

  const meta = utils.normaliseMeta(source);

  meta.moduleParts.push('export const first = {someData: "from the first loader"}');

  this.callback(null, meta, map);
};
