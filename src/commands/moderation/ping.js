const BaseCommand = require("../../utils/structures/BaseCommand");
const StateManager = require("../../utils/StateManager");

module.exports = class ping extends BaseCommand {
    constructor() {
        super('ping', 'moderation', ['latency'], 'Shows the latency from the Bot');
        this.connection = StateManager.connection;
    }

    async run(client, message) {
        if (message.author.bot) return;
        const msg = await message.channel.send('Pinging...')
        const latency = msg.createdTimestamp - message.createdTimestamp
        msg.edit(`🍊 Bot Latency: \`${latency}ms\``)
        await message.react('🏓')
    }
}