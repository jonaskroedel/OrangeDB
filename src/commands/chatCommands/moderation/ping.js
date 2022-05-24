const BaseCommand = require("../../../utils/structures/BaseCommand");
const StateManager = require("../../../utils/StateManager");

module.exports = class ping extends BaseCommand {
    constructor() {
        super('ping', 'moderation', ['latency'], 'Shows the latency from the Bot');
        this.connection = StateManager.connection;
    }

    async run(client, message) {
        if (message.author.bot) return;
        const msg = await message.channel.send('Pinging...')
        const Botlatency = msg.createdTimestamp - message.createdTimestamp
        const Apilatency = client.ws.ping;

        msg.edit(`🍊 Bot Latency: \`${Botlatency}ms\`, Api Latency: \`${Apilatency}ms\``)
        await message.react('🏓')
    }
}