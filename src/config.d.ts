declare global {
  namespace NodeJS {
    interface ProcessEnv {
      /**
       * Logging level
       *
       * @default "INFO"
       * @example "ERROR" | "WARN" | "INFO" | "DEBUG" | "TRACE"
       */
      BOT_LOG_LEVEL?: string;

      /**
       * JSON file path for SimpleFsStorageProvider
       *
       * @default "storage/bot.json" // Store bot data in the file
       * @example "" // Use bot data from memory
       */
      BOT_STORAGE_PATH?: string;

      /**
       * Address of the homeserver
       *
       * @default "https://matrix.org"
       */
      MATRIX_HOMESERVER_URL?: string;

      /**
       * Access token for the bot's account
       *
       * @default ""
       * @see https://github.com/drcmatrix/drcm-bot#receiving-access-token
       * @see https://t2bot.io/docs/access_tokens/
       */
      MATRIX_ACCESS_TOKEN: string;

      /**
       * Username provided to Pantalaimon daemon for encryption support
       *
       * @default "" // Use default client without Pantalaimon reverse proxy
       */
      PANTALAIMON_USERNAME?: string;

      /**
       * Password provided to Pantalaimon daemon for encryption support
       *
       * @default ""
       */
      PANTALAIMON_PASSWORD?: string;
    }
  }
}

export {};
