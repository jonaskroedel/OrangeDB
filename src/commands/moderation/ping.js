const {Client, Intents} = require('discord.js');
const client = new Client({intents: [Intents.FLAGS.GUILDS, "GUILD_MESSAGES"]});
const BaseCommand = require("../../utils/structures/BaseCommand");
const StateManager = require("../../utils/StateManager");

module.exports = class ping extends BaseCommand {
    constructor() {
        super('ping', 'moderation', ['latency']);
        this.connection = StateManager.connection;
    }

    async run(client, message, args) {
        if (message.author.bot) return;
        const msg = await message.channel.send('Pinging...')
        const latency = msg.createdTimestamp - message.createdTimestamp
        msg.edit(`🍊 Bot Latency: \`${latency}ms\``)
        await message.react('🏓')
    }
}