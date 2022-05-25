const { MessageEmbed } = require("discord.js");
const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('loop')
        .setDescription('Loops queue or song')
        .addStringOption(option =>
            option.setName('mode')
                .setDescription('Select the mode for autoplay')
                .addChoices({
                        name: 'Loop song on/off',
                        value: 'track'
                    },
                    {
                        name: 'Loop queue on/off',
                        value: 'queue'
                    })),
    async execute(client, interaction) {

        const player = interaction.client.manager.players.get(interaction.guild.id);
        if (player && player.state === "CONNECTED") {
            let args = interaction.options.getString('mode')

            if (!player.queue.current) {
                let embed = new MessageEmbed()
                    .setColor("RED")
                    .setDescription('❌ There is no active Music Bot');
                return interaction.reply({
                    embeds: [embed],
                    ephemeral: true
                });
            }
            if (args === 'track') {
                player.setTrackRepeat(!player.trackRepeat);
                let embed = new MessageEmbed()
                    .setColor(`${player.trackRepeat === true ? "GREEN" : "RED"}`)
                    .setDescription(
                        `${player.trackRepeat === true ? "🔂 track repeat on" : "🔂 track repeat off"}`
                    );
                return interaction.reply({
                    embeds: [embed],
                    ephemeral: true
                });
            } else if (args === 'queue') {
                player.setQueueRepeat(!player.queueRepeat);
                let embed = new MessageEmbed()
                    .setColor(`${player.queueRepeat === true ? "GREEN" : "RED"}`)
                    .setDescription(
                        `${player.queueRepeat === true ? "🔁 queue repeat on" : "🔁 queue repeat off"}`
                    );
                return interaction.reply({
                    embeds: [embed],
                    ephemeral: true
                });
            } else if (!args) {
                let embed = new MessageEmbed()
                    .setColor("#F8AA2A")
                    .setDescription(
                        `${player.queueRepeat === true ? "🔁 queue repeat on" : "🔁 queue repeat off"}
                        ${player.trackRepeat === true ? "🔂 track repeat on" : "🔂 track repeat off"}`
                    );
                return interaction.reply({
                    embeds: [embed],
                    ephemeral: true
                });
            }

        }
        else return interaction.reply({
            content: 'There is no active music bot!',
            ephemeral: true
        });
    }
}