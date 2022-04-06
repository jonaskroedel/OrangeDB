const {Client, Intents, MessageEmbed} = require('discord.js');
const client = new Client({intents: [Intents.FLAGS.GUILDS, "GUILD_MESSAGES"]});
const BaseCommand = require("../../utils/structures/BaseCommand");
const StateManager = require("../../utils/StateManager");

module.exports = class help extends BaseCommand {
    constructor() {
        super('help', 'moderation', []);
        this.connection = StateManager.connection;
    }

    async run(client, message) {
        const sEmbed = new MessageEmbed()
            .setTitle(`Help page for ${message.guild.name}`)
            .setDescription(`**help** -- shows this page
                            **prefix** -- changes default prefix
                            **ping** -- shows the latency of the bot
                            **userinfo** -- userinfo from you or mentioned user
                            **clear [amount]** -- deletes [amount] messages in the current channel
                            **reddit** -- sends post from r/meme, a custom-set default or a custom subreddit
                            **subreddit [subreddit]** -- changes default sub`)
            .setColor('#e45e81')
            .setThumbnail(client.user.displayAvatarURL())
            .setFooter({text: `Requested by ${message.author.username}`, iconURL: message.author.displayAvatarURL({dynamic: true})})
            .setTimestamp();
        message.channel.send({embeds: [sEmbed]});
    }
}