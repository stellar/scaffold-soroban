const { merge } = require("webpack-merge");
const webpack = require("webpack");
const I18nextWebpackPlugin = require("i18next-scanner-webpack");
const { commonConfig } = require("./webpack.common.js");

const LOCALES = ["en", "pt"];

const prodConfig = (env = { PRODUCTION: false, TRANSLATIONS: false }) => ({
  mode: "production",
  optimization: {
    minimize: env.PRODUCTION,
    runtimeChunk: "single",
  },

  plugins: [
    new webpack.DefinePlugin({
      DEV_SERVER: false,
    }),
    ...(env.TRANSLATIONS
      ? [
          new I18nextWebpackPlugin({
            async: true,
            dest: "./",
            extensions: [".ts", ".tsx"],
            options: {
              createOldCatalogs: false,
              locales: LOCALES,
              output: "src/locales/$LOCALE/$NAMESPACE.json",
              sort: true,
              useKeysAsDefaultValue: true,
            },
          }),
        ]
      : []),
  ],
  performance: {
    hints: "warning",
  },
});

module.exports = (env) => merge(prodConfig(env), commonConfig(env));
