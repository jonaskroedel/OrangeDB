const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require("discord.js");
const {convertTime} = require("../../utils/convert");
const {progressbar} = require("../../utils/progressbar");

module.exports = class PauseCommand extends BaseCommand {
    constructor() {
        super('remove', 'music', []);
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

            let position = Number(args[0]) - 1;
            console.log(position);

            if(!Number(args[0])) position = 0;

            if (position + 1 > player.queue.size) {
                const number = position + 1;
                let thing = new MessageEmbed()
                    .setColor("RED")
                    .setDescription(`❌ Cant remove that song queue size < ${number}`
                    );
                return message.channel.send({ embeds: [thing] });
            }

            const song = player.queue[position];
            player.queue.remove(position);

            let thing = new MessageEmbed()
                .setColor("RED")
                .setDescription(`❌ Removed ${song.title} from queue`
                );
            return message.channel.send({ embeds: [thing] });


        }
        else message.channel.send('There is no active music bot.')
    }
}