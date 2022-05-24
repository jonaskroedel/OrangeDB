const BaseCommand = require('../../../utils/structures/BaseCommand');
const StateManager = require('../../../utils/StateManager');
const {MessageEmbed} = require("discord.js");

module.exports = class Subreddit extends BaseCommand {
    constructor() {
        super('save', 'playlist', ['savequeue', 'sq']);
        this.connection = StateManager.connection;
    }

    async run(client, message, args) {

        const player = client.manager.get(message.guild.id);
        if (player && player.state === "CONNECTED") {

            if (!player.queue.current) {
                let thing = new MessageEmbed()
                    .setColor("RED")
                    .setDescription('❌ There is no active Music Bot');
                return message.reply({embeds: [thing]});
            }


            if (!args[0]) {
                return message.channel.send(`You need to provide a name`);
            } else {
                const name = args.join(" ").toLowerCase();
                const userid = message.member.user.id;

                let playlistName = [];
                const song = player.queue.current;
                const tracks = player.queue;
                const newSong = [];
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
                                    playlistName.push(result[0][0].playlistName);
                                });
                            } catch {
                            }
                        }
                        if (playlistName.length === 0) {
                            return await message.channel.send(`You don't have any playlists!`);
                        } else {
                            if (!playlistName.includes(name)) {
                                return message.channel.send(`You don't have any playlists named like that!`)
                            }
                            if (player.queue.current) {
                                newSong.push(song.uri)
                            }
                            for (const track of tracks) {
                                newSong.push(track.uri);
                            }

                            const songs = JSON.stringify(newSong);
                            const playlist = songs.replaceAll(`'`, `\\'`);

                            try {
                                await StateManager.connection.query(
                                    `UPDATE playlists
                                     SET playlist = '${playlist}'
                                     WHERE userId = '${userid}'
                                     AND playlistName = '${name}'`
                                );
                                const sEmbed = new MessageEmbed()
                                    .setColor("GREEN")
                                    .setTitle(`Playlist saved!`)
                                    .setDescription(`Saved current queue to your playlist **${name}**`)
                                return message.channel.send({embeds: [sEmbed]});
                            } catch (err) {
                                console.log(err)
                            }
                        }
                    });
                } catch {
                }
            }
        } else message.channel.send('There is no active music bot.');
    }
}
