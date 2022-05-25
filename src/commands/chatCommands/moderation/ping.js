const BaseCommand = require("../../../utils/structures/BaseCommand");
const StateManager = require("../../../utils/StateManager");

module.exports = class ping extends BaseCommand {
    constructor() {
        super('ping', 'moderation', ['latency'], 'Shows the latency from the Bot');
        this.connection = StateManager.connection;
    }

    async run(client, message) {
        const lang = client.langs.get(message.guild.id);
        const { ping } = require(`../../../utils/langs/${lang}.json`)
        if (message.author.bot) return;
        const msg = await message.channel.send('Pinging...')
        const Botlatency = msg.createdTimestamp - message.createdTimestamp
        const Apilatency = client.ws.ping;

        msg.edit(`🍊 Bot ${ping}: \`${Botlatency}ms\`, Api ${ping}: \`${Apilatency}ms\``)
        await message.react('🏓')
    }
}