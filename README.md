# drcm-bot

Matrix bot written in TypeScript, estimated for use at __dR Community Matrix (dRCM)__. Under the hood, it heavily relies on [matrix-bot-sdk](https://github.com/turt2live/matrix-bot-sdk).

> This bot is in pre-alpha stage of development. Always keep bot's storage backed up. I mean, it's even double on production as we move forward.

## Getting Started

Let's cut to the chase and set up local development environment.

### Prerequisites

- Node.js and npm;
- user's credentials dedicated for the bot on any Matrix homeserver  (access token or username/password pair);
- for the better developer experience, we recommend Visual Studio Code as an IDE.

### Package Installation

Use npm to install dependencies:
```bash
$ npm install
```

### Receiving Access Token

First things first, if you don't have access token yet, create a new Matrix session via this small command line utility:
```bash
$ npm run auth -- --username USERNAME --password PASSWORD [--device-name HOSTNAME]

[INFO] [auth] Access token: ********************************************
```

Save this access token for the next step. Make sure it isn't leaked.

### Adding Configuration

We will need one environment variable overriden to make bot functional. For that, create `.env` file with this line:
```
MATRIX_ACCESS_TOKEN=********************************************
```

By default, persistent bot data is written into `storage/bot.json`. It is where we keep common state of the bot between reloads. State may consist of information about Regular and Head Members, as well as miscellaneous events.

Encryption is supported by introducing [Pantalaimon](https://github.com/matrix-org/pantalaimon), the most straightforward reverse proxy without burden to reinvent a crypto storage. Configure credentials accordingly with `PANTALAIMON_USERNAME` and `PANTALAIMON_PASSWORD` environment variables. Otherwise, inability to decrypt messages becomes a big limitation: there is no way to handle direct messages and messages in other E2EE rooms.

### Starting Bot

Here is the way to start the bot with live reload on your local environment:
```bash
$ npm run start:dev
```

## Production Deployment

There is a generic script for running bot on production environment:
```bash
$ npm start
```

Unlike the development script, it has no live reload, because this should be handled separately with CI/CD pipeline. We've made it via Heroku, you can try something else.

## Planned Features

- 🗣 __Communication Proxy__. Acting as a conversation proxy between the Head Members, on one side, and Coming/Regular Members, on other side.

  - 👥 __Membership Test__. Secret screening process made responsibly through the bot proxy - assign random Head Member as Examiner of adequacy checkup made on a Coming Member. Examiner's identity and conversation with Coming Member will only be seen to Administrators, which allows to perform an audit without compromising their anonymity to lower Head Members.

  - 👀 __Secret Feedback__. Allow your Regular Members to provide a feedback that only Adminitrators will see. No need to pick them manually!

- 📜 __Guideline Acceptance__. Let each of All Members to be twice aware of every rule by ticking the boxes every time they receive a new role.

- 🧮 __Dot-voting__. Everyone should be able to make a poll that boils down to several preferences distributed by the members. Inclusion and exclusion terms are planned too, which can be used for contests and such.
