const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require("discord.js");

module.exports = class ResumeCommand extends BaseCommand {
    constructor() {
        super('resume', 'music', []);
    }
    async run (client, message, args) {
        const player = message.client.manager.get(message.guild.id);
        if (player && player.state === "CONNECTED") {
            const song = player.queue.current;

            if (!player.queue.current) {
                let thing = new MessageEmbed()
                    .setColor("RED")
                    .setDescription('❌ There is no active Music Bot');
                return message.channel.send({ embeds: [thing] });
            }

            if (!player.paused) {
                let thing = new MessageEmbed()
                    .setColor("RED")
                    .setDescription(`❌ Music Bot is not paused`)
                    .setThumbnail(player.queue.current.thumbnail);
                return message.channel.send({ embeds: [thing] });
            }

            player.pause(false);

            let thing = new MessageEmbed()
                .setDescription(
                    `✅ Music Bot successfully resumed! Playing: 
                    SongTitle: ${song.title}
                    SongUrl: ${song.uri}`
                )
                .setColor("GREEN")
                .setThumbnail(player.queue.current.thumbnail);
            return message.channel.send({ embeds: [thing] });
        }
        else message.channel.send('There is no active music bot.')
    }
}