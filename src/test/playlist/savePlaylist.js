// const BaseCommand = require('../../utils/structures/BaseCommand');
// const { MessageEmbed } = require("discord.js");
// const StateManager = require("../../utils/StateManager");
//
// module.exports = class twentyforseven extends BaseCommand {
//     constructor() {
//         super('save', 'playlist', []);
//         this.connection = StateManager.connection;
//     }
//     async run (client, message, prefix, args) {
//
//         const Name = args[0].replace(/_/g, ' ');
//         const player = message.client.manager.get(message.guild.id);
//         if (!player.queue.current) {
//             let thing = new MessageEmbed()
//                 .setColor("RED")
//                 .setDescription('❌ There is no active Music Bot');
//             return message.channel.send({ embeds: [thing] });
//         }
//
//
//     }
// }