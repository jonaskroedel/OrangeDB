const BaseCommand = require('../../utils/structures/BaseCommand');
const StateManager = require('../../utils/StateManager');
const {MessageEmbed} = require("discord.js");

module.exports = class Subreddit extends BaseCommand {
    constructor() {
        super('load', 'songs', ['loadplaylist', 'loadpl', 'lp', 'lpl']);
        this.connection = StateManager.connection;
    }

    async run(client, message, args) {

        if (!message.member.voice.channel) return message.channel.send("you need to join a voice channel.");
        if (!args.length) return message.channel.send("you need to give me an URL or a search term.");

        const player = client.manager.create({
            guild: message.guild.id,
            voiceChannel: message.member.voice.channel.id,
            textChannel: message.channel.id,
        });


        const name = args.join(" ").toLowerCase();
        const userid = message.member.user.id;

        let songsName = [];
        let songs;
        let row;

        try {
            await StateManager.connection.query(
                `SELECT COUNT(*) AS rowCount
                 FROM playlists
                 WHERE userId = '${userid}'`
            ).then(async result => {
                row = result[0][0].rowCount;
                for (let i = 0; i < row; i++) {
                    try {
                        await StateManager.connection.query(
                            `SELECT *
                             FROM playlists
                             WHERE userId = '${message.member.user.id}'
                             LIMIT ${i},1`
                        ).then(result => {
                            songsName.push(result[0][0].playlistName);
                        });
                    } catch {
                    }
                }
                if (songsName.length === 0) {
                    return await message.channel.send(`You don't have any playlists!`);
                } else {
                    if (!songsName.includes(name)) {
                        return message.channel.send(`You don't have any playlists named like that!`)
                    }
                    try {
                        await StateManager.connection.query(
                            `SELECT *
                             FROM playlists
                             WHERE userId = '${userid}'
                               AND playlistName = '${name}'`
                        ).then(result => {
                            songs = result[0][0].playlist;
                        })
                    } catch {
                    }

                    let count = 0;
                    const m = await message.channel.send({
                        embeds: [
                            new MessageEmbed()
                                .setColor("YELLOW")
                                .setDescription(`Adding track(s) from your songs **${name}** to the queue.`)
                        ]
                    })


                    const playlist = JSON.parse(songs)
                    if (!playlist) {
                        return m.edit({
                            embeds: [
                                new MessageEmbed()
                                    .setColor("RED")
                                    .setDescription(`Your playlist **${name}** does not contain any songs!`)
                            ]
                        })
                    }
                    for (let i = 0; i < playlist.length; i++) {
                        let s = await player.search(playlist[i], message.author);
                        if (s.loadType === "TRACK_LOADED") {
                            if (player.state !== "CONNECTED") player.connect();
                            if (player) player.queue.add(s.tracks[0]);
                            if (player && player.state === "CONNECTED" && !player.playing && !player.paused && !player.queue.size) await player.play();
                            ++count;
                        } else if (s.loadType === "SEARCH_RESULT") {
                            if (player.state !== "CONNECTED") player.connect();
                            if (player) player.queue.add(s.tracks[0]);
                            if (player && player.state === "CONNECTED" && !player.playing && !player.paused && !player.queue.size) await player.play();
                            ++count;
                        }
                        if (player && !player.queue.current) player.destroy();
                        if (count <= 0 && m) return await m.edit({embeds: [new MessageEmbed().setColor("RED").setDescription(`Couldn't add any tracks from your playlist **${name}** to the queue.`)]})
                        if (m) await m.edit({embeds: [
                            new MessageEmbed()
                                .setColor("YELLOW")
                                .setDescription(`Adding ${count} track(s) from your playlist **${name}** to the queue.`)
                            ]});
                    }
                    if (m) await m.edit({embeds: [
                        new MessageEmbed()
                            .setColor("GREEN")
                            .setDescription(`Added ${count} track(s) from your playlist **${name}** to the queue.`)
                        ]});
                }
            });
        } catch (err) {
            console.log(err)
        }

    }
}
