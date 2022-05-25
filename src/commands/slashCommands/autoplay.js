const { MessageEmbed } = require("discord.js");
const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('autoplay')
        .setDescription('Enables or disables autoplay')
        .addStringOption(option =>
            option.setName('mode')
                .setDescription('Select the mode for autoplay')
                .addChoices({
                        name: 'autoplay on',
                        value: 'on'
                    },
                    {
                        name: 'autoplay off',
                        value: 'off'
                    })),
    async execute(client, interaction) {

        const player = interaction.client.manager.players.get(interaction.guild.id);
        if (player && player.state === "CONNECTED") {

            let args = interaction.options.getString('mode')
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

            const emojiautoplay = '🔄';

            if (!args) {
                const thing = new MessageEmbed()
                    .setColor(`${autoplay === true ? "GREEN" : "RED"}`)
                    .setDescription(`${emojiautoplay} ${autoplay === true ? 'Autoplay is on' : 'Autoplay is off'}`);
                return interaction.reply({
                    embeds: [thing],
                    ephemeral: true
                });
            } else if (args === 'on') {
                const identifier = player.queue.current.identifier;
                player.set("autoplay", true);
                player.set("requester", interaction.author);
                player.set("identifier", identifier);
                const search = `https://www.youtube.com/watch?v=${identifier}&list=RD${identifier}`;
                let res = await player.search(search, interaction.author);
                let track = parseInt((Math.random() * 15) + 5);
                player.queue.add(res.tracks[track]);
                let thing = new MessageEmbed()
                    .setColor('GREEN')
                    .setDescription(`${emojiautoplay} Autoplay on`);
                return interaction.reply({
                    embeds: [thing],
                    ephemeral: true
                });
            } else if (args === 'off') {
                player.set("autoplay", false);
                let thing = new MessageEmbed()
                    .setColor('RED')
                    .setDescription(`${emojiautoplay} Autoplay off`);
                return interaction.reply({
                    embeds: [thing],
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