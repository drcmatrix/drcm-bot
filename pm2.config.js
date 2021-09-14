module.exports = {
  apps: [
    {
      name: "drcm-bot",
      ignore_watch: ["node_modules", "storage"],
      interpreter: "node",
      interpreter_args: "--require ts-node/register",
      script: "src/bot.ts",
    },
  ],
};
