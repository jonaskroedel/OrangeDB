const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require("discord.js");
const StateManager = require("../../utils/StateManager");

module.exports = class twentyforseven extends BaseCommand {
    constructor() {
        super('saveplaylist', 'music', ['plsave', 'pl']);
        this.connection = StateManager.connection;
    }
    async run (client, message, prefix) {

        const player = message.client.manager.players.get(message.guild.id);
        if (player && player.state === "CONNECTED") {

            const [command, ...args] = message.content.slice(prefix.length).split(/\s+/);
            let playlistName = args.join(" ")





            if (args.length === 0) {
                const embed = new MessageEmbed()
                    .setColor(`RED`)
                    .setDescription(`You need to choose a name for your playlist`);
                return message.channel.send({embeds: [embed]});
            }
            if (0 < args <= 100) {
                // await StateManager.connection.query(
                //     `INSERT INTO guildplaylists VALUES ('${message.guild.id}', '${playlistName}', '${JSON.stringify(playlist)}')`
                // );
                console.log(player.queue)
                console.log(JSON.stringify(player.queue))
            }

        }
        else message.channel.send('There is no active music bot.')
    }
}