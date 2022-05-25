const {Client, Intents, MessageEmbed} = require('discord.js');
const BaseCommand = require("../../../../utils/structures/BaseCommand");
const got = require('got');

module.exports = class Reddit extends BaseCommand{
    constructor() {
        super('reddit', 'fun', ['meme']);
    }

    async run(client, message, args) {
        const lang = client.langs.get(message.guild.id);
        const { meme } = require(`../../../../utils/langs/${lang}.json`)
        if (message.author.bot) return;
        const guildReddit = client.guildSubReddits.get(message.guild.id);


        await message.react('📝')
        let sub;
        args[0] ? sub = args[0] : sub = guildReddit;


        const sEmbed = new MessageEmbed()
        let link = `https://www.reddit.com/r/${sub}/random.json`
        got(link)
            .then(response => {

                const [list] = JSON.parse(response.body)
                const [post] = list.data.children
                sEmbed.setTitle(`r/${sub} • ${post.data.title} ${post.data.over_18 ? '• NSFW' : ''}`)
                sEmbed.setDescription(post.data.selftext)
                sEmbed.setURL(`${'https://reddit.com' + post.data.permalink}`)
                sEmbed.setColor('RANDOM')
                sEmbed.setImage(post.data.over_18 ? '' : post.data.url)
                sEmbed.setFooter({text: `⬆️${post.data.ups}                🗨️${post.data.num_comments}`})
                sEmbed.setTimestamp()

                message.channel.send({embeds: [sEmbed]});
            })
            .catch(err => {
                console.error(err);
                message.channel.send(`${message.member} r/${sub} ${meme.error}`)
            })
    }
}