const {Client, Intents, MessageEmbed} = require('discord.js');
const client = new Client({intents: [Intents.FLAGS.GUILDS, "GUILD_MESSAGES"]});
const BaseCommand = require("../../utils/structures/BaseCommand");
const StateManager = require("../../utils/StateManager");
const moment = require('moment');

module.exports = class help extends BaseCommand {
    constructor() {
        super('userinfo', 'moderation', []);
        this.connection = StateManager.connection;
    }




    async run(client, message) {
        let member = message.mentions.members.first() || message.member,
            user = member.user;

        const sEmbed = new MessageEmbed()
            .setColor("#ff1966")
            .setTitle(`Userinfo for ${user.username}`)
            .setThumbnail(user.avatarURL())
            .setDescription(`
                Username: \`${user.username}\` Discriminator: \`#${user.discriminator}\`
                Since **${moment.utc(member.joinedAt).format('DD.MM.YY')}** on \`${message.guild}\`
                Account created on **${moment.utc(user.createdAt).format('DD.MM.YY')}**
                ${member.permissions.has("ADMINISTRATOR") ? 'User is `Administrator`' : 'User is `no Administrator`'}
                ${user.bot ? 'User is a `bot`' : 'User is `not a bot`'}`)
            .setFooter({ text:`Requested by ${message.author.username}`, iconURL: message.author.displayAvatarURL({dynamic: true})})
            .setTimestamp()
        message.channel.send({embeds: [sEmbed]});
    }
}