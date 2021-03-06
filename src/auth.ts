#!/usr/bin/env node
import {
  LogLevel,
  LogService,
  MatrixAuth,
  RichConsoleLogger,
} from "matrix-bot-sdk";
import { program } from "commander";
import os from "os";

program
  .name("npm run auth")
  .usage(`-- -u username -p password [-d device-name]`)
  .description("Create new Matrix session and get access token")
  .requiredOption("-u, --username <string>", "Matrix login username")
  .requiredOption("-p, --password <string>", "Matrix login password")
  .option("-d, --device-name <string>", "Matrix session name", os.hostname());

program.parse(process.argv);
const options = <
  {
    username: string;
    password: string;
    deviceName: string;
  }
>program.opts();

LogService.setLogger(new RichConsoleLogger());
LogService.setLevel(LogLevel[process.env.BOT_LOG_LEVEL]);
LogService.info("auth", "Making new session...");

(async function () {
  const auth = new MatrixAuth(process.env.MATRIX_HOMESERVER_URL);
  const client = await auth.passwordLogin(
    options.username,
    options.password,
    options.deviceName
  );
  LogService.info("auth", `Access token: ${client.accessToken}`);
})();
