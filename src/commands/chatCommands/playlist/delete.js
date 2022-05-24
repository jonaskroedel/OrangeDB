const BaseCommand = require('../../../utils/structures/BaseCommand');
const StateManager = require('../../../utils/StateManager');
const {MessageEmbed} = require("discord.js");

module.exports = class Subreddit extends BaseCommand {
    constructor() {
        super('delete', 'playlist', ['del', 'delpl', 'deleteplaylist', 'dp']);
        this.connection = StateManager.connection;
    }

    async run(client, message, args) {

        let row;
        let playlistName = [];
        const userid = message.member.user.id;

        if (!args[0]) {
            return message.channel.send(`You need to provide a name`);
        } else {
            const name = args.join(" ").toLowerCase();
            try {
                await StateManager.connection.query(
                    `SELECT COUNT(*) AS rowCount FROM playlists WHERE userId = '${userid}'`
                ).then(result => {
                    row = result[0][0].rowCount;
                });
            } catch { }
            for (let i = 0; i < row; i++) {
                try {
                    await StateManager.connection.query(
                        `SELECT *
                         FROM playlists
                         WHERE userId = '${message.member.user.id}' LIMIT ${i},1`
                    ).then(result => {
                        playlistName.push(result[0][0].playlistName);
                    });
                } catch { }
            }
            if (!playlistName.includes(name)) {
                const sEmbed = new MessageEmbed()
                    .setColor("RED")
                    .setTitle(`Error while deleting Playlist!`)
                    .setDescription(`You don't have a playlist with that name!`)
                return message.channel.send({embeds: [sEmbed]});
            }

            try {
                await StateManager.connection.query(
                    `DELETE FROM playlists WHERE userId = '${userid}' AND playlistName = '${name}'`
                );
                const sEmbed = new MessageEmbed()
                    .setColor("GREEN")
                    .setTitle(`Playlist deleted!`)
                    .setDescription(`Playlist **${name}** deleted! You can't undo that!`)
                return message.channel.send({embeds: [sEmbed]});
            } catch (err) {
                message.channel.send('There was an error while executing this command!')
            }
        }
    }
}
