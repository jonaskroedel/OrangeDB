const {Client, Intents, MessageEmbed, Formatters} = require('discord.js');
const client = new Client({intents: [Intents.FLAGS.GUILDS, "GUILD_MESSAGES"]});
const BaseCommand = require("../../utils/structures/BaseCommand");
const StateManager = require("../../utils/StateManager");
const moment = require('moment');
const rtf1 = new Intl.RelativeTimeFormat('en', { style: 'narrow'});


module.exports = class help extends BaseCommand {
    constructor() {
        super('userinfo', 'moderation', []);
        this.connection = StateManager.connection;
    }




    async run(client, message) {
        let member = message.mentions.members.first() || message.member,
            user = member.user;

        const diff = moment.duration(moment.utc().diff(user.createdTimestamp));
        let age = `${diff.years()} years ${diff.months()} months and ${diff.days()} days`;

        const sEmbed = new MessageEmbed()
            .setColor(member.roles.color.hexColor)
            .setTitle(`Userinfo for ${user.username}`)
            .setThumbnail(user.avatarURL())
            .addField(`Username:`, user.username, true)
            .addField(`Discriminator:`, `#${user.discriminator}`, true)
            .addField(`Account age:`, age, true)
            .addField(`Highest-role:`, `${member.roles.highest}`, true)
            .addField(`Admin:`, member.permissions.has("ADMINISTRATOR") ? '✅' : '❌', true)
            .addField(`Bot:`, user.bot ? '✅' : '❌', true)
            .addField(`Server joined:`, moment.utc(member.joinedAt).format('DD.MM.YY'), true)


            .setFooter({ text:`Requested by ${message.author.username}`, iconURL: message.author.displayAvatarURL({dynamic: true})})
            .setTimestamp()
        message.channel.send({embeds: [sEmbed]});
        message.delete();
    }
}