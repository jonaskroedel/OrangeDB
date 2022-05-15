const BaseCommand = require('../../utils/structures/BaseCommand');
const StateManager = require('../../utils/StateManager');
const {MessageEmbed} = require("discord.js");

module.exports = class Subreddit extends BaseCommand {
    constructor() {
        super('pl', 'playlist', ['playlists', 'pls']);
        this.connection = StateManager.connection;
    }

    async run(client, message) {

        let playlistName = [];
        let row;
        const userid = message.member.user.id;

        try {
            await StateManager.connection.query(
                `SELECT COUNT(*) AS rowCount FROM playlists WHERE userId = '${userid}'`
            ).then(async result => {
                row = result[0][0].rowCount;
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
                if (playlistName.length === 0) {
                    return await message.channel.send(`You don't have any playlists!`)
                }
                const sEmbed = new MessageEmbed()
                    .setTitle(`${message.member.user.username} playlists`)
                    .setColor("GREEN")
                    .setDescription(` • ${playlistName.toString().replaceAll(',', '\n • ')}`);

                message.channel.send({embeds: [sEmbed]})
            });
        } catch (err) { console.log(err)}
    }
}
