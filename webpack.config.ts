import dotenv from "dotenv";
import { join, resolve } from "path";
import { Configuration } from "webpack";
import { ConfigurationMode, DEFAULT_MODE, DEFAULT_PORT } from "./src/Shared";
import { getPlugins, getLoaders, getDevelopment } from "./webpack";

dotenv.config();

const mode = (process.env.MODE as ConfigurationMode) || DEFAULT_MODE;
const port = process.env.PORT || DEFAULT_PORT;

const configuration: Configuration = {
  mode,
  entry: resolve("src", "index.jsx"),
  output: {
    path: join(__dirname, "build"),
    filename: "[name]_[contenthash:8].js",
    clean: true,
  },
  plugins: getPlugins({ mode }),
  module: {
    rules: getLoaders({ mode }),
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx", ".scss", ".css"],
  },
  ...getDevelopment({ mode, port }),
};

export default configuration;