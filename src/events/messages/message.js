const BaseEvent = require('../../utils/structures/BaseEvent');
const StateManager = require('../../utils/StateManager');

const guildCommandPrefixes = new Map();

module.exports = class MessageEvent extends BaseEvent {
    constructor () {
        super('messageCreate');
        this.connection = StateManager.connection;
    }



    async run (client, message) {

        if (message.author.bot) return;
        const prefix = guildCommandPrefixes.get(message.guild.id);

        const usedPrefix = message.content.slice(0, prefix.length);

        console.log(prefix);

        if (prefix === usedPrefix) {
            const [cmdName, ...cmdArgs] = message.content.slice(prefix.length).split(/\s+/);
            const command = client.commands.get(cmdName.toLowerCase());
            if (command) {
                command.run(client, message, cmdArgs);
            }
        }
    }
}

StateManager.on('prefixFetched', (guildId, prefix) => {
    guildCommandPrefixes.set(guildId, prefix);
});

StateManager.on('prefixUpdate', (guildId, prefix) => {
    guildCommandPrefixes.set(guildId, prefix);
    console.log('Guild prefix updated');
});

