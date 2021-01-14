const CracoAlias = require("craco-alias");
// const WebpackBar = require("webpackbar");

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        baseUrl: "./",
        aliases: {
          "@components/*": "./components/*",
          "@store/*": "./store/*",
          "@hooks/*": "./hooks/*",
          "@maps/*": "./maps/*",
          "@types/*": "./types/*",
          "@utils/*": "./utils/*",
        },
      },
    },
  ],
};
