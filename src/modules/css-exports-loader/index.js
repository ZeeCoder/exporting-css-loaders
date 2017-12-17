const utils = require("../css-loader-utils");

module.exports = function(source, map) {
  if (this.cacheable) {
    this.cacheable();
  }

  const meta = utils.normaliseMeta(source);

  const moduleBuilder = [];

  moduleBuilder.push(...meta.moduleParts);

  // TODO we could accept an option on what should be exported as default
  moduleBuilder.push(`export default \`${meta.css}\`;`);

  this.callback(null, moduleBuilder.join("\n"), map);
};
