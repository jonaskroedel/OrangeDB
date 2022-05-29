const BaseCommand = require('../../../utils/structures/BaseCommand');
const { MessageEmbed } = require("discord.js");

module.exports = class LoopCommand extends BaseCommand {
    constructor() {
        super('loop', 'music', []);
    }
    async run (client, message, prefix) {
        const lang = client.langs.get(message.guild.id);
        const { loop, musicdefault } = require(`../../../utils/langs/${lang}.json`)
        const [command, ...args] = message.content.slice(prefix.length).split(/\s+/);
        const player = message.client.manager.players.get(message.guild.id);
        const loops = args.join(" ");

        if (player && player.state === "CONNECTED") {

            if (!player.queue.current) {
                let thing = new MessageEmbed()
                    .setColor("RED")
                    .setDescription(musicdefault.no_bot);
                return message.reply({embeds: [thing]});
            }
            if (loops === 'track') {
                player.setTrackRepeat(!player.trackRepeat);
                let embed = new MessageEmbed()
                    .setColor(`${player.trackRepeat === true ? "GREEN" : "RED"}`)
                    .setDescription(
                        `${player.trackRepeat === true ? loop.track_loop_on : loop.track_loop_off}`
                    );
                return message.channel.send({ embeds: [embed] });
            } else if (loops === 'queue') {
                player.setQueueRepeat(!player.queueRepeat);
                let embed = new MessageEmbed()
                    .setColor(`${player.queueRepeat === true ? "GREEN" : "RED"}`)
                    .setDescription(
                        `${player.queueRepeat === true ? loop.queue.on : loop.queue.off}`
                    );
                return message.channel.send({ embeds: [embed] });
            } else if (!loops) {
                let embed = new MessageEmbed()
                    .setColor("#F8AA2A")
                    .setDescription(
                        `${player.queueRepeat === true ? loop.queue.on : loop.queue.off}
                        ${player.trackRepeat === true ? loop.track_loop_on : loop.track_loop_off}`
                    );
                return message.channel.send({ embeds: [embed] })
            }

        } else return message.channel.send(musicdefault.no_bot)
    }
}