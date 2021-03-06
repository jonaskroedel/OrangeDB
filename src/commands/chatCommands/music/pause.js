const BaseCommand = require('../../../utils/structures/BaseCommand');
const { MessageEmbed } = require("discord.js");

module.exports = class PauseCommand extends BaseCommand {
    constructor() {
        super('pause', 'music', []);
    }
    async run (client, message, args) {
        const player = message.client.manager.get(message.guild.id);
        if (player && player.state === "CONNECTED") {
            if (!player.queue.current) {
                let thing = new MessageEmbed()
                    .setColor("RED")
                    .setDescription('❌ There is no active Music Bot');
                return message.channel.send({ embeds: [thing] });
            }
            const song = player.queue.current;

            if (player.paused) {
                let thing = new MessageEmbed()
                    .setColor("RED")
                    .setDescription(`❌ Music Bot is already paused 
                    SongTitle: ${song.title}
                    SongUrl: ${song.uri}`)
                    .setThumbnail(player.queue.current.thumbnail);
                return message.channel.send({ embeds: [thing] });
            }
            await player.pause(true);
            let thing = new MessageEmbed()
                .setColor("RED")
                .setDescription(
                    `❌ Music Bot paused 
                    SongTitle: ${song.title}
                    SongUrl: ${song.uri}`
                )
                .setThumbnail(player.queue.current.thumbnail);
            return message.channel.send({ embeds: [thing] });
        }
        else message.channel.send('There is no active music bot.')
    }
}