const {Client, Intents, MessageEmbed} = require('discord.js');
const client = new Client({intents: [Intents.FLAGS.GUILDS, "GUILD_MESSAGES"]});
const BaseCommand = require("../../utils/structures/BaseCommand");
const StateManager = require("../../utils/StateManager");

const guildCommandPrefixes = new Map();

const cmdNames = new Map();
const cmdDescs = new Map();

module.exports = class help extends BaseCommand {
    constructor() {
        super('help', 'moderation', []);
        this.connection = StateManager.connection;
    }

    async run(client, message) {

        // String.prototype.interpolate = function(params) {
        //     const names = Object.keys(params);
        //     const vals = Object.values(params);
        //     return new Function(...names, `return \`${this}\`;`)(...vals);
        // }
        //
        // for (let i = 1; i < cmdNames.size + 1; i++) {
        //
        //     commands[i-1] = cmdNames.get(i);
        //     descs[i-1] = cmdDescs.get(i);
        //
        //     const template = '{ name: ${commdName}, ${commdDesc}, inline: true }, ';
        //     result = template.interpolate({
        //         commdName: cmdNames.get(i),
        //         commdDesc: cmdDescs.get(i),
        //         prfx: guildCommandPrefixes.get(message.guild.id)
        //     });
        //
        //     cmds += result;
        // }

        const sEmbed = new MessageEmbed()
            .setTitle(`Help page for ${message.guild.name}`)
            .setColor('#e45e81')
            .setThumbnail(client.user.displayAvatarURL())
            .setFooter({text: `Requested by ${message.author.username}`, iconURL: message.author.displayAvatarURL({dynamic: true})})
            .setTimestamp();

        for(let i = 1; i < cmdNames.size + 1; i++) {
            sEmbed.addFields(
                { name: guildCommandPrefixes.get(message.guild.id) + cmdNames.get(i), value: cmdDescs.get(i), inline: true },
            )
        };

        message.channel.send({embeds: [sEmbed]});
        message.delete();
    }
}

StateManager.on('namesFetched', (nr, cmdName) => {
    cmdNames.set(nr, cmdName);
});
StateManager.on('descsFetched', (nr, cmdDesc) => {
    cmdDescs.set(nr, cmdDesc);
});
StateManager.on('prefixUpdate', (guildId, prefix) => {
    guildCommandPrefixes.set(guildId, prefix);
});
StateManager.on('prefixFetched', (guildId, prefix) => {
    guildCommandPrefixes.set(guildId, prefix);
});
StateManager.on('guildAdded', (guildId, prefix) => {
    guildCommandPrefixes.set(guildId, prefix);
});