const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('join')
        .setDescription('Joins the current voice'),

    async execute(client, interaction) {
        const { channel } = interaction.member.voice;

        if (channel) {
            const player = client.manager.create({
                guild: interaction.guild.id,
                voiceChannel: interaction.member.voice.channel.id,
                textChannel: interaction.channel.id,
                selfDeafen: true,
            });
            player.connect();
            client.musicPlayers.set(interaction.guild.id, player);
            interaction.reply({
                content: `Joined your current voice-channel`,
                ephemeral: true
            });
        } else {
            interaction.reply({
                content: 'You need to join a voicechannel first to play music.',
                ephemeral: true
            });
        }
    }
}