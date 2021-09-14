module.exports = {
  apps: [
    {
      name: "drcm-bot",
      ignore_watch: ["node_modules", "storage"],
      interpreter: "node",
      interpreter_args:
        "--require ts-node/register --require dotenv-defaults/config dotenv_config_silent=true",
      script: "src/bot.ts",
    },
  ],
};
