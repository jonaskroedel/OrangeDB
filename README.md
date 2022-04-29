<h1 align="center">
    <br>
    <a href="https://github.com/jonaskroedel/OrangeDB"><img src="./images/OrangeDB.png"></a>
    <br>
    Orange Discord Bot
    <br>
</h1>

<h3 align=center>A multi-Guild usable Discord bot built with <a href=https://github.com/discordjs/discord.js>discord.js</a></h3>

<div align=center>

  <a href="https://discord.gg/EejzQcpMHG">
    <img src="https://discordapp.com/api/guilds/771331659953602601/widget.png?style=shield" alt="shield.png">
  </a>

  <a href="https://github.com/discordjs">
    <img src="https://img.shields.io/badge/discord.js-v13.6.0-blue.svg?logo=npm" alt="shield.png">
  </a>

  <a href="https://github.com/sabattle/CalypsoBot/blob/develop/LICENSE">
    <img src="https://img.shields.io/badge/license-GNU%20GPL%20v3-green" alt="shield.png">
  </a>

</div>

<p align="center">
  <a href="#about">About</a>
  •
  <a href="#features">Features</a>
  •
  <a href="#installation">Installation</a>
  •
  <a href="#setting-up">Setting Up</a>
  •
  <a href="#license">License</a>
  •
  <a href="#credits">Credits</a>
  •
  <a href="[here](https://github.com/jonaskroedel/OrangeDB/blob/master/COMMANDS.md#detailed-page-for-all-commands)">Commands</a>
</p>



<p align="center">The orange [ˈɔrɪndʒ] is a round, sweet fruit with a thick orange skin and an orange core, which is divided into many parts.</p>
<h4 align="center">Or·ange [the]: A fruit</h4>

## About

Orange is an open source, customizable Discord bot that is constantly growing. The Bot comes packaged with a variety of commands. The Bot's codebase also serves as a base framework so everyone can easily create a Discord Bot of all kinds and needs. You can invite Orange to your Discord server using [this](https://discord.com/api/oauth2/authorize?client_id=845681260567068712&permissions=8&scope=bot) link! Also, you can join my Server [Funf](https://discord.gg/EejzQcpMHG) for questions, suggestions, assistance and much more.

If you like this repository, feel free to leave a star ⭐ to help promote Orange!
<br>
You can find a detailed information sheet with all commands [here](https://github.com/jonaskroedel/OrangeDB/blob/master/COMMANDS.md#detailed-page-for-all-commands).

## Features

``21`` commands across ``3`` different categories!

- ``fun`` commands like `reddit`, `reddit [custom subreddit]` 
- ``moderation`` commands like `clear`, `clearchannel`, `prefix` and `userinfo`
- ``music`` commands like `play`, `lyrics`, `24/7`, `autoplay`, `skip` and much more

## Installation

You can add Orange to your server with [this](https://discord.com/api/oauth2/authorize?client_id=845681260567068712&permissions=8&scope=bot) link! Alternatively, you can clone this repository and host the bot yourself.

````
git clone https://github.com/jonaskroedel/orangedb
````

After cloning, run these commands

````
npm install
npm install discord.js
npm install dotenv --save
npm install --save mysql2
npm install got@11.8.3
npm install lyrics-finder
````

to get all the dependencies and packages. You need [Node.js](https://nodejs.org/) and [MySQL](https://www.mysql.com/) installed. I highly recommend to install [nodemon](https://www.npmjs.com/package/nodemon) as it makes testing *much* easier.

## Setting Up

You have to create a ``.env`` file in your root directory to run the bot (you can use the example file provided as a base). Your file should look something like this:

````
BOT_TOKEN=YOURTOKEN
DB_HOST=YOUR_HOST_ADRESS //eg. localhost
DB_USER=YOUR_DB_USER //eg. root
DB_PASS=YOUR_DB_PASSWORD //eg. root
DB_NAME=orangedb  //if you dont know, then do not change that!
HOST=YOU_LAVALINK_HOST
PASSWORD=YOUR_LAVALINK_PASSWORD
PORT=YOUR_LAVALINK_PORT
````

Visit the Discord [developer portal](https://discordapp.com/developers/applications/) to create an app and use the client token you are given for the `token` option. `ownerId` is your own Discord snowflake.

After that, you have enable `Privileged Intents` on your Discord [developer portal](https://discordapp.com/developers/applications/). You can find these intents under the "Bot" section, and there are two ticks you have to switch on. For more information on Gateway Intents, check out [this](https://discordjs.guide/popular-topics/intents.html#the-intents-bit-field-wrapper) link.

## To-Do

OrangeDB is a continous state of development. New features/updates can come at any time. Some pending ideas are:

- ~~Music~~ 
- Ticket-System
- Automod
- Autoroles
- Stream alerts

## License

Released under the [GNU GPL v3](https://www.gnu.org/licenses/gpl-3.0.en.html) license.

## Credits

- **Jonas Krödel** - *initial work, artwork, idea, implementation and project management* - [github](https://github.com/jonaskroedel)
- **Julian Hoffmann** - *minor helping* - [github](https://github.com/juhom205)
- **Angelo Failoni** - *helping hand and database-design* - [github](https://github.com/BrainFuzz-hub)

<h6 align="center">© Jonas Krödel 2022</h6>
