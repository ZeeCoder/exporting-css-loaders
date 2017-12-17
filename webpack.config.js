module.exports = {
  entry: "./src/main.js",
  output: {
    path: __dirname + "/web/dist",
    filename: "main.js"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "./src/modules/css-exports-loader",
          "./src/modules/second-loader",
          "./src/modules/first-loader",
        ]
      }
    ]
  }
};
