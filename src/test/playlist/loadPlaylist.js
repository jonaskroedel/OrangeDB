// const BaseCommand = require('../../utils/structures/BaseCommand');
// const { MessageEmbed } = require("discord.js");
// const StateManager = require("../../utils/StateManager");
//
// module.exports = class twentyforseven extends BaseCommand {
//     constructor() {
//         super('load', 'music', []);
//         this.connection = StateManager.connection;
//     }
//     async run (client, message, prefix) {
//
//             // const [command, ...args] = message.content.slice(prefix.length).split(/\s+/);
//             // let playlistName = args.join(" ")
//
//             // if (args.length === 0) {
//             //     const embed = new MessageEmbed()
//             //         .setColor(`RED`)
//             //         .setDescription(`You need to choose a name for your playlist`);
//             //     return message.channel.send({embeds: [embed]});
//             // }
//
//             // Create the player
//             const player = client.manager.create({
//                 guild: message.guild.id,
//                 voiceChannel: message.member.voice.channel.id,
//                 textChannel: message.channel.id,
//             });
//
//             // Connect to the voice channel and add the track to the queue
//             if (player && player.state !== "CONNECTED") {
//                 player.connect();
//                 // player.setVolume(guildVolumes.get(message.guild.id))
//             }
//             player.queue.add(track);
//
//
//         }
//         // else message.channel.send('There is no active music bot.')
//
// }