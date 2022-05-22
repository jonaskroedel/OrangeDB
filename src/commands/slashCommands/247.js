const {MessageEmbed} = require("discord.js");
const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('twentyfourseven')
        .setDescription('Enables or disables 24/7')
        .addStringOption(option =>
            option.setName('mode')
                .setDescription('Select the mode for 24/7')
                .addChoices({
                        name: '24/7 on',
                        value: 'on'
                    },
                    {
                        name: '24/7 off',
                        value: 'off'
                    })),
    async execute(client, interaction) {

        const player = interaction.client.manager.players.get(interaction.guild.id);
        if (player && player.state === "CONNECTED") {

            let args = interaction.options.getString('mode')

            if (!args) {
                const embed = new MessageEmbed()
                    .setColor(`${player.twentyFourSeven === true ? "GREEN" : "RED"}`)
                    .setDescription(`${player.twentyFourSeven === true ? '24/7 is on' : '24/7 is off'}`);
                return interaction.reply({
                    embeds: [embed],
                    ephemeral: true
                });
            } else if (args === 'off') {
                player.twentyFourSeven = false;
                const embed = new MessageEmbed()
                    .setColor("RED")
                    .setDescription('24/7 is off');
                return interaction.reply({
                    embeds: [embed],
                    ephemeral: true
                });
            } else if (args === 'on') {
                player.twentyFourSeven = true;
                const embed = new MessageEmbed()
                    .setColor("GREEN")
                    .setDescription('24/7 is on');

                return interaction.reply({
                    embeds: [embed],
                    ephemeral: true
                });
            }
        } else interaction.reply({
            content: 'There is no active music bot.',
            ephemeral: true
        });
    }
}