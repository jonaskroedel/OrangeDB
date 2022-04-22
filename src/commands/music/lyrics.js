const BaseCommand = require('../../utils/structures/BaseCommand');
const {MessageEmbed} = require("discord.js");
const lyricsFinder = require("lyrics-finder");

module.exports = class LyrisCommand extends BaseCommand {
    constructor() {
        super('lyrics', 'music', []);
    }

    async run(client, message, args) {
        const player = message.client.manager.players.get(message.guild.id);
        if (player && player.state === "CONNECTED") {
            const queue = player.queue.current;
            if (!queue) return message.channel.send(("There is no active Music Bot")).catch(console.error);

            let lyrics = null;
            const title = queue.title;
            try {
                lyrics = await lyricsFinder(queue.title, "");
                if (!lyrics) lyrics = "lyrics not found"
            } catch (error) {
                lyrics = "lyrics not found"
            }


            let lyricsEmbed = new MessageEmbed()
                .setTitle(`${player.queue.current.title}`)
                .setDescription(lyrics)
                .setColor("#F8AA2A")

            if (lyricsEmbed.description.length >= 2048)
                lyricsEmbed.description = `${lyricsEmbed.description.substr(0, 2045)}...`;
            return message.channel.send({embeds: [lyricsEmbed]}).catch(console.error);
        }

        message.reply('There is no active music bot.')
    }
}