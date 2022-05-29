const BaseCommand = require('../../../utils/structures/BaseCommand');
const { MessageEmbed } = require("discord.js");

module.exports = class JoinCommand extends BaseCommand {
    constructor() {
        super('autoplay', 'music', []);
    }
    async run (client, message, prefix) {
        const lang = client.langs.get(message.guild.id);
        const { autoplay, musicdefault } = require(`../../../utils/langs/${lang}.json`)
        const player = message.client.manager.get(message.guild.id);
        if (player && player.state === "CONNECTED") {
            if (!player.queue.current) {
                let thing = new MessageEmbed()
                    .setColor("RED")
                    .setDescription(musicdefault.no_bot);
                return message.reply({embeds: [thing]});
            }
            const [command, args] = message.content.slice(prefix.length).split(/\s+/);

            const autoplay = player.get("autoplay");

            const emojiautoplay = '🔄';

            if (!args) {
                const embed = new MessageEmbed()
                    .setColor(`${autoplay === true ? "GREEN" : "RED"}`)
                    .setDescription(`${emojiautoplay} ${autoplay === true ? autoplay.on : autoplay.off}`);
                return message.channel.send({embeds: [embed]});
            } else if (args === 'on') {
                const identifier = player.queue.current.identifier;
                player.set("autoplay", true);
                player.set("requester", message.author);
                player.set("identifier", identifier);
                const search = `https://www.youtube.com/watch?v=${identifier}&list=RD${identifier}`;
                let res = await player.search(search, message.author);
                let track = parseInt((Math.random() * 15) + 5);
                player.queue.add(res.tracks[track]);
                let thing = new MessageEmbed()
                    .setColor('GREEN')
                    .setDescription(`${emojiautoplay} ${autoplay.on}`);
                return message.channel.send({embeds: [thing]});
            } else if (args === 'off') {
                player.set("autoplay", false);
                let thing = new MessageEmbed()
                    .setColor('RED')
                    .setDescription(`${emojiautoplay} ${autoplay.off}`);
                return message.channel.send({embeds: [thing]});
            } else {
                message.channel.send(musicdefault.onoff);
            }
        }
        else message.channel.send(musicdefault.no_bot)
    }
}