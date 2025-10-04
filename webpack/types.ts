import { ConfigurationMode } from "../src/Shared"

export type WebpackOptions = {
  mode: ConfigurationMode;
  port?: string | number;
};