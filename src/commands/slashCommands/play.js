const BaseCommand = require('../../utils/structures/BaseCommand');
const {MessageEmbed} = require("discord.js");
const StateManager = require("../../utils/StateManager");

const guildVolumes = new Map();
const guildCommandPrefixes = new Map();

const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Plays requested Song')
        .addStringOption(option =>
        option.setName('song')
            .setDescription('Link or Name from Song or Author')
            .setRequired(true)),

    async execute(client, interaction) {

        const search = interaction.options.getString('song')

        if (!interaction.member.voice.channel) return interaction.reply({
            content: "you need to join a voice channel.",
            ephemeral: true
        });

        let res;

        try {
            // Search for tracks using a query or url, using a query searches youtube automatically and the track requester object
            res = await client.manager.search(search, interaction.author);
            // Check the load type as this command is not that advanced for basics
            if (res.loadType === "LOAD_FAILED") throw res.exception;
            else if (res.loadType === "PLAYLIST_LOADED") throw {message: `Playlists are not supported with this command. Try ${guildCommandPrefixes.get(message.guild.id)}playpl`};
        } catch (err) {
            return interaction.reply({
                content: `there was an error while searching: ${err.message}`,
                ephemeral: true
            });
        }

        if (res.loadType === "NO_MATCHES") return interaction.reply({
            content: "there were no tracks found with that query.",
            ephemeral: true
        });

        // Create the player
        const player = client.manager.create({
            guild: interaction.guild.id,
            voiceChannel: interaction.member.voice.channel.id,
            textChannel: interaction.channel.id,
            selfDeafen: true,
        });

        // console.log(res)

        // Connect to the voice channel and add the track to the queue
        if (player && player.state !== "CONNECTED") {
            player.connect();
            player.setVolume(guildVolumes.get(interaction.guild.id))
        }
        player.queue.add(res.tracks[0]);

        // Checks if the client should play the track if it's the first one added
        if (!player.playing && !player.paused && !player.queue.size) await player.play()

        const embed = new MessageEmbed()
            .setColor("GREEN")
            .setDescription(`🎶 Now playing ${res.tracks[0].title} \n requested from ${res.tracks[0].requester}
            ${res.tracks[0].uri}`)
            .setThumbnail(res.tracks[0].thumbnail);
        return interaction.reply({
            embeds: [embed],
            ephemeral: true
        });
    }
}

StateManager.on('volumeFetched', (guildId, subReddit) => {
    guildVolumes.set(guildId, subReddit);
});
StateManager.on('volumeUpdate', (guildId, subReddit) => {
    guildVolumes.set(guildId, subReddit);
});
StateManager.on('prefixUpdate', (guildId, prefix) => {
    guildCommandPrefixes.set(guildId, prefix);
});
StateManager.on('prefixFetched', (guildId, prefix) => {
    guildCommandPrefixes.set(guildId, prefix);
});
StateManager.on('guildAdded', (guildId, prefix) => {
    guildCommandPrefixes.set(guildId, prefix);
});