const BaseCommand = require('../../utils/structures/BaseCommand');
const {MessageEmbed} = require("discord.js");
const StateManager = require("../../utils/StateManager");

const guildVolumes = new Map();

const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Plays requested Song')
        .addSubcommand(subcommand =>
            subcommand
                .setName('song')
                .setDescription('Plays provided song.')
                .addStringOption(option =>
                    option.setName('song')
                        .setDescription('Link or Name from Song or Author')
                        .setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('playlist')
                .setDescription('Plays provided playlist.')
                .addStringOption(option =>
                    option.setName('playlist')
                        .setDescription('Link or Name from Playlist, Song or Author')
                        .setRequired(true))
        ),


    async execute(client, interaction) {
        const lang = client.langs.get(interaction.guild.id);
        const { play } = require(`../../utils/langs/${lang}.json`)

        const vol = guildVolumes.get(interaction.guild.id) || 100;

        const track = interaction.options.getString('song') || interaction.options.getString('playlist');

        if (!interaction.member.voice.channel) return interaction.reply({
            content: play.play_error_1,
            ephemeral: true
        });

        let res;

        try {
            if (interaction.options.getSubcommand() === 'song') {
                interaction.reply({
                    content: play.loading_song,
                    ephemeral: true
                });
                // Search for tracks using a query or url, using a query searches youtube automatically and the track requester object
                res = await client.manager.search(track, interaction.member.user);
                // Check the load type as this command is not that advanced for basics
                if (res.loadType === "LOAD_FAILED") throw res.exception;
                else if (res.loadType === "PLAYLIST_LOADED") throw {message: play.error_playlist};
            } else if (interaction.options.getSubcommand() === 'playlist') {
                interaction.reply({
                    content: play.loading_playlist,
                    ephemeral: true
                });
                // Search for tracks using a query or url, using a query searches youtube automatically and the track requester object
                res = await client.manager.search(track, interaction.member.user);
                // Check the load type as this command is not that advanced for basics
                if (res.loadType === "LOAD_FAILED") throw res.exception;
            }
        } catch (err) {
            return interaction.editReply({
                content: `${play.error_2} ${err.message}`,
                ephemeral: true
            });
        }

        if (res.loadType === "NO_MATCHES") return interaction.reply({
            content: play.error_3,
            ephemeral: true
        });

        // Create the player
        const player = client.manager.create({
            guild: interaction.guild.id,
            voiceChannel: interaction.member.voice.channel.id,
            textChannel: interaction.channel.id,
            selfDeafen: true,
        });

        // Connect to the voice channel and add the track to the queue
        if (player && player.state !== "CONNECTED") {
            player.connect();
            player.setVolume(vol)
        }

        if (interaction.options.getSubcommand() === 'song') {
            player.queue.add(res.tracks[0]);
            if (!player.playing && !player.paused && !player.queue.size) await player.play()
        } else if (interaction.options.getSubcommand() === 'playlist') {
            player.queue.add(res.tracks[0]);
            if (!player.playing && !player.paused && !player.queue.size) await player.play()
            for (let i = 1; i < res.tracks.length; i++) {
                // adding the tracks to the queue
                player.queue.add(res.tracks[i]);
            }
        }

        // Checks if the client should play the track if it's the first one added


        const embed = new MessageEmbed()
            .setColor("GREEN")
            .setDescription(`🎶 ${play.now_1} ${res.tracks[0].title} \n ${play.now_2} ${res.tracks[0].requester}
            ${res.tracks[0].uri}`)
            .setThumbnail(res.tracks[0].thumbnail);
        return interaction.editReply({
            content: null,
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