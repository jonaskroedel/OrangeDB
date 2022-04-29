<h1 align="center">
    <br>
    <a href="https://github.com/jonaskroedel/OrangeDB"><img src="./images/OrangeDB.png"></a>
    <br>
    Orange Discord Bot Commands
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
  <a href="#moderation">Moderation</a>
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
</p>

## Moderation

Orange supports currently ``6`` commands in the Category Moderation

- ``o!prefix`` With this command you can change the bots prefix from your current Server. Example command: `o!prefix --` _prefix changed to `--`_
- ``o!ping`` With this command you can show the latency from this bot.
- ``o!userinfo`` With this command you get an embed with some userinfos from you, or the mentioned member. Example command: `o!userinfo @mentioned_user` _sends a embed with the userinfos from @mentioned_user_
- ``o!clear []`` With this command you can clear a certain amount of messages in your current channel. Example command: `o!clear 99` _cleared 99 messages_
- ``o!clearchannel`` With this command you can delete a whole Channel. (Channel gets cloned an the old one deleted).
- ``o!subreddit []`` With this command you can change the bots subreddit from your current server. Example command: `o!subreddit reddithelp` _r/reddithelp is now your current subreddit_


## Music

Orange supports currently ``14`` commands in the Category Music

- ``o!join`` With this command Orange joins your current Voice-Channel.
- ``o!play []`` With this command Orange plays the Song you provided via Link or Name. Example command:  `o!play Never gonna give you up` _Never gonna give you up - Rick Astley is now playing_
- ``o!pause`` With this command you can pause the current song.
- ``o!resume`` With this command you can resume the current paused song.
- ``o!stop`` With this command you can stop the current song (Can't be resumed anymore).
- ``o!24/7`` With this command you can enable the 24/7 mode.
- ``o!autoplay`` With this command you can enable autoplay. (Currently in development. Only adds one song.)
- ``o!skip`` With this command you can skip the current song.
- ``o!queue`` With this command you get an embed with the current songs in the queue.
- ``o!now`` With this command you get the current song playing.
- ``o!remove []`` With this command you can remove a song in your queue. Example command: `o!remove 3` _Removed third Song in the current queue_
- ``o!lyrics`` With this command you get the lyrics to the current song.
- ``o!clearqueue`` With this command you can clear the 