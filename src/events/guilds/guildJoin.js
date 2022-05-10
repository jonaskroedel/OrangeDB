const BaseEvent = require('../../utils/structures/BaseEvent');
const StateManager = require('../../utils/StateManager');
const { MessageEmbed } = require("discord.js");

const guildWelcomes = new Map();

/*
    © Jonas Krödel 2022
    You may use and modify this code. You must mention me, the owner,
    and you may not pass off the code as your own!
*/

module.exports = class GuildMemberAddEvent extends BaseEvent {
    constructor() {
        super('guildMemberAdd');
        this.connection = StateManager.connection;
    }

    async run(client, member) {
        if (guildWelcomes.get(member.guild.id)) {

            const welcomeEmbed = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`${member} has entered ${member.guild.name}`);
            client.channels.cache.get(guildWelcomes.get(member.guild.id)).send({embeds: [welcomeEmbed]});
        }
    }
}

StateManager.on('welcomeFetched', (guildId, guildWelcome) => {
    guildWelcomes.set(guildId, guildWelcome);
});

StateManager.on('welcomeUpdate', (guildId, guildWelcome) => {
    guildWelcomes.set(guildId, guildWelcome);
});