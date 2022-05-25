const StateManager = require('../../utils/StateManager');
const BaseEvent = require("../../utils/structures/BaseEvent");
const { MessageAttachment } = require("discord.js");
const Canvas = require('canvas');
const path = require('path');

const img = path.join(__dirname, '../../../images/background.png');

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
        if (client.guildWelcomes.get(member.guild.id)) {
            if (member.guild.channels.cache.get(client.guildWelcomes.get(member.guild.id)) !== undefined) {

                let text = member.user.username;

                if (text.length > 16) {
                    text = text.slice(0, 16) + "...";
                }

                const canvas = Canvas.createCanvas(700, 400);
                const context = canvas.getContext('2d');
                const background = await Canvas.loadImage(img)
                context.drawImage(background, 0, 0, canvas.width, canvas.height);

                const textWidth = context.measureText(text).width;

                context.font = '60px sans-serif';
                context.fillStyle = '#ffffff';
                context.strokeStyle = '#ffffff';
                // context.lineWidth = applyStroke(canvas, message.member.user.username)
                context.textAlign = 'center';
                context.fillText(text, canvas.width / 2, 300);
                context.strokeText(text, canvas.width / 2, 300);

                context.beginPath();
                context.globalAlpha = 0.08;
                context.rect(10, 10, 680, 380);
                context.fill();
                context.closePath();

                context.beginPath();
                context.globalAlpha = 1;
                context.arc(350, 130, 103, 0, Math.PI * 2, true)
                context.fill('#ffffff');
                context.closePath();

                context.font = '28px sans-serif';
                context.fillStyle = '#ffffff';
                context.textAlign = 'center';
                context.fillText('joined the server!', canvas.width / 2, 350);

                context.beginPath();
                context.arc(350, 130, 100, 0, Math.PI * 2, true);
                context.closePath();
                context.clip();
                const avatar = await Canvas.loadImage(member.user.displayAvatarURL({format: 'jpg'}));
                context.drawImage(avatar, 250, 30, 200, 200);

                const attachment = new MessageAttachment(canvas.toBuffer(), 'card.png');

                client.channels.cache.get(client.guildWelcomes.get(member.guild.id)).send({
                    content: `Welcome 👋 ${member}, have a great stay!`,
                    files: [attachment]
                });
            }
        }
    }
}