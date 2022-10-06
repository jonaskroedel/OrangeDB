const {Client, Intents, MessageEmbed} = require('discord.js');
const BaseCommand = require("../../../utils/structures/BaseCommand");
const got = require('got');
const fs = require('fs');
const Canvas = require("canvas");

module.exports = class Reddit extends BaseCommand {
    constructor() {
        super('make', 'fun', ['makeMeme']);
    }

    async run(client, message, args) {
        console.log("make")
        // const lang = client.langs.get(message.guild.id);
        // const { meme } = require(`../../../../utils/langs/${lang}.json`)
        if (message.author.bot) return;

        let url = "";

            message.attachments.forEach(attachment => {
            // do something with the attachment
            url = attachment.url;
            console.log(url)
        });

        const temp = await Canvas.loadImage(url);

        message.channel.send({
            content: `test`,
            files: [temp]
        });

        console.log(url)

    }
}