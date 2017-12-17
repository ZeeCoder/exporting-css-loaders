const normaliseMeta = meta => {
  if (typeof meta !== "string") {
    // already normalised
    return meta;
  }

  // This is probably a call done by the first loader in the chain, where
  // "meta" is the css source string.
  return {
    css: meta,
    // `module` is joined by the last loader: css-exports-loader
    // TODO combining each loader's output in the same scope could be troublesome.
    moduleParts: []
  };
};

module.exports = {
  normaliseMeta
};
