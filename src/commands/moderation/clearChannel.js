const {Client, Intents} = require('discord.js');
const client = new Client({intents: [Intents.FLAGS.GUILDS, "GUILD_MESSAGES"]});
const BaseCommand = require("../../utils/structures/BaseCommand");
const StateManager = require("../../utils/StateManager");

module.exports = class clear extends BaseCommand {
    constructor() {
        super('clearchannel', 'moderation', []);
        this.connection = StateManager.connection;
    }

    async run (client, message, args) {
        if (message.member.permissions.has("MANAGE_CHANNELS") && message.member.permissions.has("MANAGE_MESSAGES")) {
            let channel = message.channel;
            let nchannel = await channel.clone();
            await message.reply(`${channel} gets cleared in \`5 seconds\` -> new channel: ${nchannel}`);
            let msg1 = await nchannel.send(`<@${message.member.id}> new channel here`);
            setTimeout(() => {
                channel.delete();
                msg1.delete();
            }, 5000);
        } else {
            await message.channel.send("You don't have enough permissions to execute this command!");
            message.delete();
        }
    }
}