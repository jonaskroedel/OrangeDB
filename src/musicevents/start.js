const BaseEvent = require('../utils/structures/BaseEvent');
const {Client, MessageEmbed, Intents} = require("discord.js");

/*
    © Jonas Krödel 2022
    You may use and modify this code. You must mention me, the owner,
    and you may not pass off the code as your own!
*/

module.exports = class TrackStartEvent extends BaseEvent {
    constructor() {
        super('trackStart');
    }

    async run (client, player) {
        const guildId = player.guild
        let track = parseInt(Math.random() * 3);

        if (player.get('autoplay')) {
            const identifier = player.queue.current.identifier;
            player.set("requester", "autoplay");
            player.set("identifier", identifier);
            const search = `https://www.youtube.com/watch?v=${identifier}&list=RD${identifier}`;
            let res = await player.search(search, 'autoplay');
            player.queue.add(res.tracks[track]);
        }

    }
}