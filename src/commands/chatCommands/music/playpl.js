const BaseCommand = require('../../../utils/structures/BaseCommand');
const {MessageEmbed} = require("discord.js");
const {progressbar} = require("../../../utils/progressbar");
const StateManager = require("../../../utils/StateManager");

const guildVolumes = new Map();

module.exports = class play extends BaseCommand {
    constructor() {
        super('playplaylist', 'music', ['ppl', 'startpl', 'playpl']);
    }

    async run(client, message, prefix) {
        const [command, ...args] = message.content.slice(prefix.length).split(/\s+/);

        if (!message.member.voice.channel) return message.channel.send("you need to join a voice channel.");
        if (!args.length) return message.channel.send("you need to give me an URL or a search term.");

        const search = args.join(" ");
        let res;

        try {
            // Search for tracks using a query or url, using a query searches youtube automatically and the track requester object
            res = await client.manager.search(search, message.author);
            // Check the load type as this command is not that advanced for basics
            if (res.loadType === "LOAD_FAILED") throw res.exception;
        } catch (err) {
            return message.channel.send(`there was an error while searching: ${err.message}`);
        }

        if (res.loadType === "NO_MATCHES") return message.reply("there were no tracks found with that query.");

        // Create the player
        const player = client.manager.create({
            guild: message.guild.id,
            voiceChannel: message.member.voice.channel.id,
            textChannel: message.channel.id,
            selfDeafen: true,
        });

        // Connect to the voice channel
        if (player && player.state !== "CONNECTED") {
            player.connect();
            player.setVolume(guildVolumes.get(message.guild.id))
        }
        player.queue.add(res.tracks[0]);
        if (!player.playing && !player.paused && !player.queue.size) await player.play()

        for (let i = 1; i < res.tracks.length; i++) {
            // adding the tracks to the queue
            player.queue.add(res.tracks[i]);
        }

        // Checks if the client should play the track if it's the first one added

        const embed = new MessageEmbed()
            .setColor("GREEN")
            .setDescription(`🎶 Now playing ${res.tracks[0].title} \n requested from ${res.tracks[0].requester}
            ${res.tracks[0].uri}`)
            .setThumbnail(res.tracks[0].thumbnail);
        return message.channel.send({ embeds: [embed] });
    }
}

StateManager.on('volumeFetched', (guildId, subReddit) => {
    guildVolumes.set(guildId, subReddit);
});
StateManager.on('volumeUpdate', (guildId, subReddit) => {
    guildVolumes.set(guildId, subReddit);
});