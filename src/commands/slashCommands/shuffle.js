const { MessageEmbed } = require("discord.js");
const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('shuffle')
        .setDescription('Shuffles the current queue'),

    async execute(client, interaction) {
        const player = interaction.client.manager.players.get(interaction.guild.id);
        if (player && player.state === "CONNECTED") {
            const player = client.manager.get(interaction.guild.id);

            if (!player.queue.current) {
                let thing = new MessageEmbed()
                    .setColor("RED")
                    .setDescription('❌ There is no active Music Bot');
                return interaction.reply({
                    embeds: [thing],
                    ephemeral: true
                });
            }

            player.queue.shuffle();

            let thing = new MessageEmbed()
                .setDescription(`Shuffled the queue`)
                .setColor("GREEN")
            return interaction.reply({
                embeds: [thing],
                ephemeral: true
            });

        } else return interaction.reply({
            content: 'There is no active music bot.',
            ephemeral: true
        })

    }
}
