const {Client, Intents, MessageEmbed} = require('discord.js');
const client = new Client({intents: [Intents.FLAGS.GUILDS, "GUILD_MESSAGES"]});
const BaseCommand = require("../../utils/structures/BaseCommand");
const StateManager = require("../../utils/StateManager");

const guildCommandPrefixes = new Map();

module.exports = class help extends BaseCommand {
    constructor() {
        super('help', 'moderation', []);
        this.connection = StateManager.connection;
    }

    async run(client, message) {
        const prefix = guildCommandPrefixes.get(message.guild.id);

        const sEmbed = new MessageEmbed()
            .setTitle(`Help page for ${message.guild.name}`)
            .setDescription(`case sensitive is not important
                            **${prefix}help** -- shows this page
                            **${prefix}prefix** -- changes default prefix
                            **${prefix}ping** -- shows the latency of the bot
                            **${prefix}userinfo** -- userinfo from you or mentioned user
                            **${prefix}clear [amount]** -- deletes [amount] messages in the current channel
                            **${prefix}clearchannel** -- deletes the channel and creates an empty one with the same properties
                            **${prefix}reddit** -- sends post from r/meme, a custom-set default or a custom subreddit
                            **${prefix}subreddit [subreddit]** -- changes default sub`)
            .setColor('#e45e81')
            .setThumbnail(client.user.displayAvatarURL())
            .setFooter({text: `Requested by ${message.author.username}`, iconURL: message.author.displayAvatarURL({dynamic: true})})
            .setTimestamp();
        message.channel.send({embeds: [sEmbed]});
    }
}

StateManager.on('prefixUpdate', (guildId, prefix) => {
    guildCommandPrefixes.set(guildId, prefix);
});

StateManager.on('prefixFetched', (guildId, prefix) => {
    guildCommandPrefixes.set(guildId, prefix);
});