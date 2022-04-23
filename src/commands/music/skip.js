const BaseCommand = require('../../utils/structures/BaseCommand');
const {MessageEmbed} = require("discord.js");

module.exports = class SkipCommand extends BaseCommand {
    constructor() {
        super('skip', 'music', []);
    }

    run(client, message) {
        const player = message.client.manager.get(message.guild.id);
        if (player && player.state === "CONNECTED") {
            if (!player.queue.current) {
                let thing = new MessageEmbed()
                    .setColor("RED")
                    .setDescription('❌ There is no active Music Bot');
                return message.reply({embeds: [thing]});
            }

            player.stop();


            let song = player.queue[0];

            if (song) {
                let thing = new MessageEmbed()
                    .setDescription(
                        `Playing: 
                    SongTitle: ${song.title}
                    SongUrl: ${song.uri}`
                    )
                    .setColor("GREEN")
                    .setThumbnail(song.thumbnail);
                return message.channel.send({embeds: [thing]});
            }
            message.channel.send('There is no next song.')
        } else message.channel.send('There is no active music bot.')
    }
}