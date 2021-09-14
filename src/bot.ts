import {
  LogLevel,
  LogService,
  MatrixClient,
  MessageEvent,
  PantalaimonClient,
  RichConsoleLogger,
  RichReply,
  SimpleFsStorageProvider,
} from "matrix-bot-sdk";
import escapeHtml from "html-es6cape";

LogService.setLogger(new RichConsoleLogger());
LogService.setLevel(LogLevel[process.env.BOT_LOG_LEVEL]);
LogService.info("bot", `Starting the bot client...`);

(async function () {
  const storage = process.env.BOT_STORAGE_PATH
    ? new SimpleFsStorageProvider(process.env.BOT_STORAGE_PATH)
    : undefined;

  let client: MatrixClient;
  if (process.env.PANTALAIMON_USERNAME) {
    // Pantalaimon daemon is supposed to handle E2E encryption pecularities without reinventing crypto storage
    const pantalaimon = new PantalaimonClient(
      process.env.MATRIX_HOMESERVER_URL,
      storage
    );
    client = await pantalaimon.createClientWithCredentials(
      process.env.PANTALAIMON_USERNAME,
      process.env.PANTALAIMON_PASSWORD
    );
  } else {
    client = new MatrixClient(
      process.env.MATRIX_HOMESERVER_URL,
      process.env.MATRIX_ACCESS_TOKEN,
      storage
    );
  }

  const userId = await client.getUserId();
  LogService.info("bot", `Client is ready`);

  client.on("room.message", (roomId: string, rawEvent) => {
    const event = new MessageEvent(rawEvent);

    const timeout = 60 * 1000;
    if (event.timestamp + timeout < Date.now()) return; // Message created within the timeout passes next
    if (event.isRedacted) return; // Redacted message doesn't pass next
    if (event.sender === userId) return; // Message from the bot itself doesn't pass next
    if (event.messageType !== "m.text") return; // Text message passes next

    const text = escapeHtml(event.textBody).trim();

    const commandRegex = /^\.[a-z]\w+/i;
    if (!commandRegex.test(text)) return; // Message with our command syntax passes next

    const commandName = text.split(" ", 1)[0];
    LogService.info("bot", `${event.sender} called command: ${commandName}`);
    const replyText = `Command not supported: \`${commandName}\``;
    const replyHtml = `<font data-mx-bg-color="#ff8800" data-mx-color="#000000">Command not supported:</font> <code>${commandName}</code>`;
    const reply = RichReply.createFor(roomId, rawEvent, replyText, replyHtml); // TODO: Make better helper function
    reply["msgtype"] = "m.notice"; // Bots should prefer notices
    return client.sendMessage(roomId, reply);
  });

  // Following is the coroutine
  await client.start();
})();
