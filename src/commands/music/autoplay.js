const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require("discord.js");

module.exports = class JoinCommand extends BaseCommand {
    constructor() {
        super('autoplay', 'music', []);
    }
    async run (client, message, prefix) {
        const player = message.client.manager.get(message.guild.id);
        if (player && player.state === "CONNECTED") {
            const [command, args] = message.content.slice(prefix.length).split(/\s+/);

            const autoplay = player.get("autoplay");

            const emojireplay = '🔄';

            if (!args) {
                const embed = new MessageEmbed()
                    .setColor(`${autoplay === true ? "GREEN" : "RED"}`)
                    .setDescription(`${emojireplay} ${autoplay === true ? 'Autoplay is on' : 'Autoplay is off'}`);
                return message.channel.send({embeds: [embed]});
            } else if (args === 'on') {
                const identifier = player.queue.current.identifier;
                player.set("autoplay", true);
                player.set("requester", message.author);
                player.set("identifier", identifier);
                const search = `https://www.youtube.com/watch?v=${identifier}&list=RD${identifier}`;
                let res = await player.search(search, message.author);
                player.queue.add(res.tracks[1]);
                let thing = new MessageEmbed()
                    .setColor('GREEN')
                    .setDescription(`${emojireplay} Autoplay on`);
                return message.channel.send({embeds: [thing]});
            } else if (args === 'off') {
                player.set("autoplay", false);
                player.queue.clear();
                let thing = new MessageEmbed()
                    .setColor('RED')
                    .setDescription(`${emojireplay} Autoplay off`);
                return message.channel.send({embeds: [thing]});
            } else {
                message.channel.send('You can only use `on` or `off`');
            }
        }
        message.reply('There is no active music bot.')
    }
}