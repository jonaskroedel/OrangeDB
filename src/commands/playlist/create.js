const BaseCommand = require('../../utils/structures/BaseCommand');
const StateManager = require('../../utils/StateManager');
const {MessageEmbed} = require("discord.js");

module.exports = class Subreddit extends BaseCommand {
    constructor() {
        super('create', 'playlist', ['cp', 'cpl', 'createpl', 'createplaylist']);
        this.connection = StateManager.connection;
    }

    async run(client, message, args) {

        let playlistName = [];
        let row;
        const userid = message.member.user.id;
        const username = message.member.user.username;

        if (!args[0]) {
            return message.channel.send(`You need to provide a name`);
        } else {
            const name = args.join(" ").toLowerCase();

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
                        } catch (err) { }
                    }
                    if (playlistName.includes(name)) {
                        const sEmbed = new MessageEmbed()
                            .setColor("RED")
                            .setTitle(`Playlist already exists!`)
                            .setDescription(`You can't create a playlist that already exists!`)
                        return message.channel.send({embeds: [sEmbed]});
                    }
                    try {
                        await StateManager.connection.query(
                            `INSERT INTO playlists (guildId, username, userId, playlistName)
                             VALUES ('${message.guild.id}', '${username}', '${userid}', '${name}')`
                        );
                        const sEmbed = new MessageEmbed()
                            .setColor("GREEN")
                            .setTitle(`Playlist created!`)
                            .setDescription(`Playlist **${name}** created by user ${message.member.user}!`)
                        message.channel.send({embeds: [sEmbed]});
                    } catch (err) {
                        const sEmbed = new MessageEmbed()
                            .setColor("RED")
                            .setTitle(`Playlist name to long!`)
                            .setDescription(`You can't create a playlist where the name is longer than 20 characters!`)
                        return message.channel.send({embeds: [sEmbed]});
                    }
                });
            } catch (err) { }
        }
    }
}

