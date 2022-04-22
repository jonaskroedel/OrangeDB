const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require("discord.js");

module.exports = class SkipCommand extends BaseCommand {
    constructor() {
        super('skip', 'music', []);
    }

    async run(client, message) {
        const player = message.client.manager.get(message.guild.id);
        if (player && player.state === "CONNECTED") {
            if (!player.queue.current) {
                let thing = new MessageEmbed()
                    .setColor("RED")
                    .setDescription('❌ There is no active Music Bot');
                return message.reply({ embeds: [thing] });
            }
            const song = player.queue.current;

            player.stop();

            let thing = new MessageEmbed()
                .setDescription(
                    `Playing: 
                    SongTitle: ${song.title}
                    SongUrl: ${song.uri}`
                )
                .setColor("GREEN");
            return message.reply({ embeds: [thing] }).then((msg) => {
                setTimeout(() => {
                    msg.delete();
                }, 3000);
            });
        }
        message.reply('There is no active music bot.')
    }
}