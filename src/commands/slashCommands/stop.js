const {MessageEmbed} = require("discord.js");
const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('Stops the music bot and clears the queue'),

    async execute(client, interaction) {
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

            const autoplay = player.get("autoplay");
            if (autoplay === true) {
                player.set("autoplay", false);
            }

            player.stop();
            player.queue.clear();

            let thing = new MessageEmbed()
                .setColor("RED")
                .setDescription('❌ Music stopped.');
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
