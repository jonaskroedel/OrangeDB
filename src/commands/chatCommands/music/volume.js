const BaseCommand = require('../../../utils/structures/BaseCommand');
const {MessageEmbed} = require("discord.js");
const StateManager = require("../../../utils/StateManager");

module.exports = class LyrisCommand extends BaseCommand {
    constructor() {
        super('volume', 'music', ['v', '%']);
        this.connection = StateManager.connection;
    }

    async run(client, message, args) {
        const player = client.manager.get(message.guild.id);
        if (player && player.state === "CONNECTED") {
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
                return await message.channel.send({embeds: [thing]});
            }

            const volume = parseInt(args[0]);

            if (!volume || volume < 0 || volume > 100) {
                let thing = new MessageEmbed()
                    .setColor("RED")
                    .setDescription(`❌ You can only define a volume between 100 and 0`)
                return message.channel.send({embeds: [thing]});
            }
            if (volume) {
                player.setVolume(volume);
                await StateManager.connection.query(
                    `UPDATE GuildConfigurable
                     SET guildVolume = '${volume}'
                     WHERE guildId = '${message.guild.id}'`
                );
                client.guildVolumes.set(message.guild.id, volume);


                let thing = new MessageEmbed()
                    .setColor("GREEN")
                    .setDescription(`🔊 Volume set to: **${volume}%**`);
                return await message.channel.send({embeds: [thing]});
            }
        } else message.channel.send('There is no active music bot.');
    }
}