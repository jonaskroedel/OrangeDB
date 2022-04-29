const BaseEvent = require('../../utils/structures/BaseEvent');
const StateManager = require('../../utils/StateManager');

const guildCommandPrefixes = new Map();

/*
    © Jonas Krödel 2022
    You may use and modify this code. You must mention me, the owner,
    and you may not pass off the code as your own!
*/

module.exports = class MessageEvent extends BaseEvent {
    constructor () {
        super('messageCreate');
        this.connection = StateManager.connection;
    }

    async run (client, message) {
        if (message.author.bot) return;
        const prefix = guildCommandPrefixes.get(message.guild.id);

        const usedPrefix = message.content.slice(0, prefix.length);

        if (prefix === usedPrefix) {
            const [cmdName, ...cmdArgs] = message.content.slice(prefix.length).split(/\s+/);
            const command = client.commands.get(cmdName.toLowerCase()) || client.commands.find(command => command.aliases && command.aliases.includes(cmdName));
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

