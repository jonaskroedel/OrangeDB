const { MessageEmbed } = require("discord.js");
const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('remove')
        .setDescription('Removes song from playlist')
        .addIntegerOption(option =>
            option.setName('songnr')
                .setDescription('Number of the song you want to remove')
                .setRequired(false)),

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

            let position = interaction.options.getInteger('songnr') - 1
            if (!interaction.options.getInteger('songnr')) position = 0

            if (position + 1 > player.queue.size) {
                const number = position + 1;
                let thing = new MessageEmbed()
                    .setColor("RED")
                    .setDescription(`❌ Cant remove that song queue size < ${number}`
                    );
                return interaction.reply({
                    embeds: [thing],
                    ephemeral: true
                });
            }

            const song = player.queue[position];
            player.queue.remove(position);

            let thing = new MessageEmbed()
                .setColor("RED")
                .setDescription(`❌ Removed ${song.title} from queue`
                );
            return interaction.reply({
                embeds: [thing],
                ephemeral: true
            });


        } else return interaction.reply({
            content: 'There is no active music bot!',
            ephemeral: true
        });
    }
}