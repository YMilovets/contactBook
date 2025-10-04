import { WebpackOptions } from "../types";
import { Configuration } from "webpack";

import "webpack-dev-server";

export default function getDevelopment({ mode, port }: WebpackOptions) {
  const OptionsByMode: Record<WebpackOptions["mode"], Configuration> = {
    development: {
      devServer: {
        port,
        hot: true,
        open: true,
        historyApiFallback: true,
      },
      devtool: "inline-source-map",
    },
    production: {},
  };

  return OptionsByMode[mode];
}