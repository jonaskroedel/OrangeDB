const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class BanCommand extends BaseCommand {
    constructor() {
        super('ban', 'moderation', []);
    }

    async run(client, message, args) {
        let banm = message.mentions.members.first()
        if (!banm) await message.channel.send(`You have to mention a user`)
        if (!message.member.permissions.has("BAN_MEMBERS")) {
            if (message.mentions.members.first()) {
                message.mentions.members.first.ban().then((member) => {
                    message.channel.send(":wave: " + member.displayName + " has been successfully banned :point_right: ");
                }).catch(() => {
                    message.channel.send("I do not have permissions to do this");
                });
            }
        }
    }
}