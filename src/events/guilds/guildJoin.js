const StateManager = require('../../utils/StateManager');
const BaseEvent = require("../../utils/structures/BaseEvent");
const {MessageEmbed, MessageAttachment} = require("discord.js");
const fs = require('fs'),
    request = require('request');
const Canvas = require('canvas');
const path = require('path');
const fetch = require('node-fetch');

const img = path.join(__dirname, '../../../images/background.png');

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
        const applyText = (canvas, text) => {
            const context = canvas.getContext('2d');

            // Declare a base size of the font
            let fontSize = 70;

            do {
                // Assign the font to the context and decrement it so it can be measured again
                context.font = `${fontSize -= 10}px sans-serif`;
                // Compare pixel width of the text to the canvas minus the approximate avatar size
            } while (context.measureText(text).width > canvas.width - 300);

            // Return the result to use in the actual canvas
            return context.font;
        };

        if (guildWelcomes.get(member.guild.id)) {
            const canvas = Canvas.createCanvas(700, 250);
            const context = canvas.getContext('2d');
            const background = await Canvas.loadImage(img)
            context.drawImage(background, 0, 0, canvas.width, canvas.height);

            context.font = applyText(canvas, member.user.username);
            context.fillStyle = '#ffffff';
            context.strokeStyle = '#000000';
            context.lineWidth = 2;
            context.fillText(member.user.username, canvas.width / 2.5, canvas.height / 1.8);
            context.strokeText(member.user.username, canvas.width / 2.5, canvas.height / 1.8);

            context.font = '28px sans-serif';
            context.fillStyle = '#ffffff';
            context.fillText('joined the server!', canvas.width / 2.5, canvas.height / 1.3);

            context.beginPath();
            context.arc(125, 125, 100, 0, Math.PI * 2, true);
            context.closePath();
            context.clip();
            const avatar = await Canvas.loadImage(member.user.displayAvatarURL({format: 'jpg'}));
            context.drawImage(avatar, 25, 25, 200, 200);

            const attachment = new MessageAttachment(canvas.toBuffer(), 'profile-image.png');

            client.channels.cache.get(guildWelcomes.get(member.guild.id)).send( {content: `Welcome 👋 ${member}, have a great stay!`, files: [attachment] });
        }
    }
}

StateManager.on('welcomeFetched', (guildId, guildWelcome) => {
    guildWelcomes.set(guildId, guildWelcome);
});

StateManager.on('welcomeUpdate', (guildId, guildWelcome) => {
    guildWelcomes.set(guildId, guildWelcome);
});