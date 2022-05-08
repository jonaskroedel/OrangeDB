const BaseCommand = require('../../utils/structures/BaseCommand');
const {MessageEmbed, MessageButton, MessageActionRow} = require("discord.js");
const lyricsFinder = require("lyrics-finder");
const {convertTime} = require("../../utils/convert");
const {progressbar} = require("../../utils/progressbar");
const StateManager = require("../../utils/StateManager");

const guildVolumes = new Map();

module.exports = class LyrisCommand extends BaseCommand {
    constructor() {
        super('volume', 'music', ['v', '%']);
    }
    async run(client, message, args, prefix) {

        const player = client.manager.get(message.guild.id);

        if (!player.queue.current) {
            let thing = new MessageEmbed()
                .setColor("RED")
                .setDescription('❌ There is no active Music Bot');
            return message.reply({embeds: [thing]});
        }

        if (!args.length) {
            let thing = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`🔊 The current volume is: **${player.volume}%**`)
            return message.channel.send({embeds: [thing]});
        }

        const volume = parseInt(args[0]);

        if (!volume || volume < 0 || volume > 100) {
            let thing = new MessageEmbed()
                .setColor("RED")
                .setDescription(`❌ You can only define a volume between 100 and 0`)
            return message.channel.send({embeds: [thing]});
        }

        player.setVolume(volume);
        await StateManager.connection.query(
            `UPDATE GuildConfigurable SET guildVolume = '${volume}' WHERE guildId = '${message.guild.id}'`
        );
        StateManager.emit('volumeUpdate', message.guild.id, volume);

        if (volume) {
            let thing = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`🔊 Volume set to: **${volume}%**`)
            if (volume === 69) {
                const msg = await message.reply('👌 Nice!');
                setTimeout(() => {
                    msg.delete()
                }, 69);
            }
            return message.channel.send({embeds: [thing]});
        }
    }
}

StateManager.on('volumeUpdate', (guildId, subReddit) => {
    guildVolumes.set(guildId, subReddit);
});