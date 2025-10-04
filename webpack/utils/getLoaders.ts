import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ReactRefreshTypeScript from "react-refresh-typescript";
import { ModuleOptions } from "webpack";
import { WebpackOptions } from "../types";
import { ConfigurationMode } from "../../src/Shared";

function getLocalClassname(isDevelopment: boolean = true) {
  if (isDevelopment) {
    return "[path][name]__[local]--[contenthash:8]";
  }
  return "[contenthash:8]";
}

export default function getLoaders({ mode }: WebpackOptions) {
  const isDevelopment = mode === ConfigurationMode.Development;

  const loaderConfiguration: ModuleOptions["rules"] = [
    {
      test: /\.[jt]sx?$/,
      exclude: /node_modules/,
      use: [
        {
          loader: "ts-loader",
          options: {
            transpileOnly: true,
            getCustomTransformers: () => {
              return {
                before: [isDevelopment && ReactRefreshTypeScript()].filter(
                  Boolean
                ),
              };
            },
          },
        },
      ],
    },
    {
      test: /\.css$/i,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: "css-loader",
          options: {
            modules: {
              localIdentName: "[local]",
              namedExport: false,
            },
          },
        },
      ],
    },
    {
      test: /\.s[ac]ss$/i,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: "css-loader",
          options: {
            modules: {
              localIdentName: "[local]",
              namedExport: false,
            },
          },
        },
        "sass-loader",
      ],
    },
    {
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            icon: true,
            svgoConfig: {
              plugins: [
                {
                  name: "convertColors",
                  params: { currentColor: true },
                },
              ],
            },
          },
        },
      ],
    },
    {
      test: /\.(png|jpg|jpeg|gif)$/i,
      type: "asset/resource",
    },
  ];
  return loaderConfiguration;
}