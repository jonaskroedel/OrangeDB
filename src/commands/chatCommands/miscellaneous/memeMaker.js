const {MessageAttachment} = require('discord.js');
const BaseCommand = require("../../../utils/structures/BaseCommand");
const fs = require('fs');
const Canvas = require("canvas");
const request = require("request");
const path = require("path");

const img = path.join(__dirname, '../../../../images/attachment.png')

module.exports = class Reddit extends BaseCommand {
    constructor() {
        super('make', 'fun', ['makeMeme', 'memeMaker']);
    }

    async run(client, message) {
        try {
            // const lang = client.langs.get(message.guild.id);
            // const { meme } = require(`../../../../utils/langs/${lang}.json`)

            if (message.author.bot) return;
            if (message.attachments.size <= 0) return message.channel.send('You need to attach one image!')

            const image = message.attachments.first()
            await request(message.attachments.first().url).pipe(fs.createWriteStream('../images/attachment.png'))

            const filter = m => m.author === message.author
            await message.channel.send('First line: 🔽')
            const collector = message.channel.createMessageCollector({filter, time: 15000})
            collector.on('collect', m => {
                collector.stop()
                message.channel.send('Received first line...')
            })

            let height2 = 50

            let content1;
            await message.channel.awaitMessages({filter, max: 1, time: 15000, errors: ['time']})
                .then(message => {
                    message = message.first()
                    content1 = message.content
                })

            await collector.on('end', collected => {
            })

            await message.channel.send('Second line: 🔽')
            const collector2 = message.channel.createMessageCollector({filter, time: 15000})
            collector2.on('collect', m => {
                collector2.stop()
                message.channel.send('Received second line...')
            })

            let content2;
            await message.channel.awaitMessages({filter, max: 1, time: 15000, errors: ['time']})
                .then(message => {
                    message = message.first();
                    content2 = message.content
                })

            collector2.on('end', collected => {
            })

            const canvas = Canvas.createCanvas(image.width, image.height + 300)
            const context = canvas.getContext('2d')
            const background = await Canvas.loadImage(img)

            context.fillStyle = '#ffffff'
            context.fillRect(0, 0, canvas.width, canvas.height)

            context.font = '100px impact'
            context.fillStyle = '#ffffff'
            context.strokeStyle = '#000000'
            context.lineWidth = 3

            const addNewline = str => {
                if (str.length < 16) {
                    return str
                }

                // Überprüfen, ob der String ein Leerzeichen enthält
                if (str.indexOf(" ") === -1) {
                    // Wenn kein Leerzeichen vorhanden ist, in der Mitte des Strings ein "-" einfügen und dann ein "\n"
                    const halfIndex = Math.ceil(str.length / 2)
                    const newStr = str.slice(0, halfIndex) + "-\n" + str.slice(halfIndex)
                    return newStr
                }

                // Wenn ein Leerzeichen vorhanden ist, das mittlere Wort bestimmen
                const words = str.split(" ")
                const middleIndex = Math.floor(words.length / 2)
                const middleWord = words[middleIndex]

                // Den String vor dem mittleren Wort, das mittlere Wort und den String nach dem mittleren Wort getrennt in drei Teile aufteilen
                const firstPart = words.slice(0, middleIndex).join(" ")
                const lastPart = words.slice(middleIndex + 1).join(" ")

                // Das mittlere Wort mit einem "\n" versehen und die drei Teile des Strings wieder zusammensetzen
                const newStr = firstPart + "\n" + middleWord + " " + lastPart
                return newStr
            }

            const textWidth1 = context.measureText(content1).width
            if (textWidth1 > canvas.width - 20) {
                content1 = addNewline(content1)
                console.log(content1)
            }
            const textWidth2 = context.measureText(content2).width
            if (textWidth2 > canvas.width - 20) {
                content2 = addNewline(content2)
                height2 = 150
            }

            context.drawImage(background, 0, (canvas.height - image.height) / 2, image.width, image.height)

            context.textAlign = 'center'
            context.fillText(content1, canvas.width / 2, 110)
            context.strokeText(content1, canvas.width / 2, 110)
            context.fillText(content2, canvas.width / 2, canvas.height - height2)
            context.strokeText(content2, canvas.width / 2, canvas.height - height2)

            const attachment = new MessageAttachment(canvas.toBuffer(), 'card.png');

            await message.channel.send({content: 'Autogenerated Meme.', files: [attachment]});
        }
        catch (e) {
            message.channel.send(e)
        }

    }
}