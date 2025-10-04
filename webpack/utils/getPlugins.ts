import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { resolve } from "path";
import { Configuration, HotModuleReplacementPlugin, ProgressPlugin } from "webpack";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

import { WebpackOptions } from "../types";
import { ConfigurationMode } from "../../src/Shared";

export default function getPlugins({ mode }: WebpackOptions) {
  const pluginsForDevelopment = [
    new HotModuleReplacementPlugin(),
    new ReactRefreshWebpackPlugin(),
    new ProgressPlugin(),
  ];

  const isDevelopment = mode === ConfigurationMode.Development

  const plugins: Configuration["plugins"] = [
    new HtmlWebpackPlugin({
      template: resolve("public", "index.html"),
    }),
    new MiniCssExtractPlugin({
      filename: "[name]_[contenthash:8].css",
      chunkFilename: "[name]_[contenthash:8].css",
    }),
  ].filter(Boolean);

  if (isDevelopment) {
    plugins.push(...pluginsForDevelopment);
  }

  if (process.env.NODE_BUNDLER) {
    plugins.push(new BundleAnalyzerPlugin());
  }

  return plugins;
}
