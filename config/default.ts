import { Config } from "../src/config";
import { LogLevel } from "matrix-bot-sdk";

const config: Config = {
  logLevel: LogLevel.INFO,
  homeserverUrl: "https://matrix.org",
};

export default config;
