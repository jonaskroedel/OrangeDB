const BaseCommand = require("../../../utils/structures/BaseCommand");

module.exports = class clear extends BaseCommand {
    constructor() {
        super('clear', 'moderation', ['purge']);
    }

    async run (client, message, args) {
        const lang = client.langs.get(message.guild.id);
        const { clear, permissions } = require(`../../../utils/langs/${lang}.json`)

        if (message.member.permissions.has("MANAGE_MESSAGES")) {
            let amount = parseInt(args[0])

            if (!amount) amount = 1
            if (amount > 100 || amount < 1) return message.channel.send(clear.between)

            message.channel.bulkDelete(amount + 1).catch(async err => {
                let msg2 = await message.channel.send(clear.error)
                setTimeout(() => {
                    msg2.delete()
                    message.delete()
                }, 2000)
            })

            let msg1 = await message.channel.send(clear.deleted.replaceAll('§amount§', amount))
            setTimeout(() => {
                msg1.delete()
            }, 2000)
        }
        else {
            let msg2 = await message.channel.send(permissions.no_perm)
            setTimeout( () => {
                msg2.delete()
                message.delete()
            }, 2000)
        }
    }
}