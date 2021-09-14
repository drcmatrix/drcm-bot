import { LogLevel } from "matrix-bot-sdk";
import * as config from "config";

export interface Config {
  /**
   * Logging level
   *
   * @default LogLevel.INFO
   */
  logLevel?: LogLevel;

  /**
   * JSON file path for SimpleFsStorageProvider
   *
   * @default undefined // Use bot data from memory
   * @example "storage/bot.json" // Store bot data in the file
   */
  simpleStoragePath?: string;

  /**
   * Address of the homeserver
   *
   * @default "https://matrix.org"
   */
  homeserverUrl?: string;

  /**
   * Access token for the bot's account
   *
   * @see https://t2bot.io/docs/access_tokens/
   */
  accessToken?: string;

  /**
   * Credentials provided to Pantalaimon daemon for encryption support
   *
   * @default undefined // Use default client without Pantalaimon reverse proxy
   */
  pantalaimon?: {
    username?: string;
    password?: string;
  };
}

export default <Config>config;
