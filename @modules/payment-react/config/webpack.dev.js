const { merge } = require("webpack-merge");
const webpack = require("webpack");
const { commonConfig } = require("./webpack.common.js");

const devConfig = {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    port: 9000,
  },
  plugins: [
    new webpack.DefinePlugin({
      DEV_SERVER: true,
    })
  ],
};

module.exports = (env) => merge(devConfig, commonConfig(env));
