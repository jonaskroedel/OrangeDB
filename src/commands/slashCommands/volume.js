const {MessageEmbed} = require("discord.js");
const StateManager = require("../../utils/StateManager");

const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('volume')
        .setDescription('Changes the volume of the music bot')
        .addIntegerOption(option =>
            option.setName('volume')
                .setDescription('Number between 100 and 1')),

    async execute(client, interaction) {
        const args = interaction.options.getInteger('volume')
        const player = interaction.client.manager.players.get(interaction.guild.id);
        if (player && player.state === "CONNECTED") {
            if (!player.queue.current) {
                let thing = new MessageEmbed()
                    .setColor("RED")
                    .setDescription('❌ There is no active Music Bot');
                return interaction.reply({
                    embeds: [thing],
                    ephemeral: true
                });
            }

            if (!args) {
                let thing = new MessageEmbed()
                    .setColor("GREEN")
                    .setDescription(`🔊 The current volume is: **${player.volume}%**`)
                return interaction.reply({
                    embeds: [thing],
                    ephemeral: true
                });
            }

            const volume = parseInt(args);

            if (!volume || volume < 0 || volume > 100) {
                let thing = new MessageEmbed()
                    .setColor("RED")
                    .setDescription(`❌ You can only define a volume between 100 and 0`)
                return interaction.reply({
                    embeds: [thing],
                    ephemeral: true
                });
            }
            if (volume) {
                player.setVolume(volume);
                await StateManager.connection.query(
                    `UPDATE GuildConfigurable
                     SET guildVolume = '${volume}'
                     WHERE guildId = '${interaction.guild.id}'`
                );
                client.guildVolumes.set(interaction.guild.id, volume);


                let thing = new MessageEmbed()
                    .setColor("GREEN")
                    .setDescription(`🔊 Volume set to: **${volume}%**`);
                return await interaction.reply({
                    embeds: [thing],
                    ephemeral: true
                });
            }
        } else return interaction.reply({
            content: 'There is no active music bot.',
            ephemeral: true
        })
    }
}