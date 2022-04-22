const {Client, Intents, MessageEmbed} = require('discord.js');
const client = new Client({intents: [Intents.FLAGS.GUILDS, "GUILD_MESSAGES"]});
const BaseCommand = require("../../../utils/structures/BaseCommand");
const StateManager = require("../../../utils/StateManager");

module.exports = class ticketInit extends BaseCommand {
    constructor() {
        super('ticketInit', 'moderation', []);
        this.connection = StateManager.connection;
    }

    async run (client, message, args) {
        await message.channel.send('cmdargs');
    }
}
