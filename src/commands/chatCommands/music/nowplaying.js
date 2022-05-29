const BaseCommand = require('../../../utils/structures/BaseCommand');
const { MessageEmbed } = require("discord.js");
const { convertTime } = require("../../../utils/convert.js");
const { progressbar } = require("../../../utils/progressbar.js");
const fs = require("fs");

module.exports = class now extends BaseCommand {
    constructor() {
        super('now', 'music', []);
    }

    async run (client, message) {
        const lang = client.langs.get(message.guild.id);
        const { now, musicdefault } = require(`../../../utils/langs/${lang}.json`)
        const player = message.client.manager.players.get(message.guild.id);

        const fs = require("fs")
        fs.readFile(`../../../utils/langs/${lang}.json`,"utf8", (err, jsonString) => {
            console.log(jsonString)
        })

        if (player && player.state === "CONNECTED") {
            if (!player.queue.current) {
                let thing = new MessageEmbed()
                    .setColor("RED")
                    .setDescription(musicdefault.no_bot);
                return message.reply({embeds: [thing]});
            }
            const song = player.queue.current;
            const current = player.position;

            const embed = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`${now.now.replaceAll('§title§', song.title).replaceAll('§user§', song.requester)}
                                    ${convertTime(current)} / ${convertTime(song.duration)}
                                    ${progressbar(player)}`)
                .setThumbnail(player.queue.current.thumbnail);
            return message.channel.send({ embeds: [embed] });
        } else return message.channel.send(musicdefault.no_bot)
    }
}