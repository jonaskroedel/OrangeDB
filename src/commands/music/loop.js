const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require("discord.js");

module.exports = class LoopCommand extends BaseCommand {
    constructor() {
        super('loop', 'music', []);
    }
    async run (client, message, prefix) {
        const [command, ...args] = message.content.slice(prefix.length).split(/\s+/);
        const player = message.client.manager.players.get(message.guild.id);
        const loops = args.join(" ");

        if (player && player.state === "CONNECTED") {

            if (!player.queue.current) {
                let embed = new MessageEmbed()
                    .setColor("RED")
                    .setDescription('❌ There is no active Music Bot');
                return message.channel.send({ embeds: [embed] });
            }
            if (loops === 'track') {
                player.setTrackRepeat(!player.trackRepeat);
                let embed = new MessageEmbed()
                    .setColor(`${player.trackRepeat === true ? "GREEN" : "RED"}`)
                    .setDescription(
                        `${player.trackRepeat === true ? "🔂 track repeat on" : "🔂 track repeat off"}`
                    );
                return message.channel.send({ embeds: [embed] });
            } else if (loops === 'queue') {
                player.setQueueRepeat(!player.queueRepeat);
                let embed = new MessageEmbed()
                    .setColor(`${player.queueRepeat === true ? "GREEN" : "RED"}`)
                    .setDescription(
                        `${player.queueRepeat === true ? "🔁 queue repeat on" : "🔁 queue repeat off"}`
                    );
                return message.channel.send({ embeds: [embed] });
            } else if (!loops) {
                let embed = new MessageEmbed()
                    .setColor("#F8AA2A")
                    .setDescription(
                        `${player.queueRepeat === true ? "🔁 queue repeat on" : "🔁 queue repeat off"}
                        ${player.trackRepeat === true ? "🔂 track repeat on" : "🔂 track repeat off"}`
                    );
                return message.channel.send({ embeds: [embed] })
            }

        }
        else message.channel.send('There is no active music bot.')
    }
}