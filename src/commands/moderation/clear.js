const {Client, Intents} = require('discord.js');
const client = new Client({intents: [Intents.FLAGS.GUILDS, "GUILD_MESSAGES"]});
const BaseCommand = require("../../utils/structures/BaseCommand");
const StateManager = require("../../utils/StateManager");

module.exports = class clear extends BaseCommand {
    constructor() {
        super('clear', 'moderation', ['purge', '']);
        this.connection = StateManager.connection;
    }

    async run (client, message, args) {
        if (message.member.permissions.has("MANAGE_MESSAGES")) {
            var amount = parseInt(args[0])

            if (!amount) amount = 1
            if (amount > 100 || amount < 1) return message.channel.send("Please select a number *between* 100 and 1")

            message.channel.bulkDelete(amount + 1).catch(err => {
                message.channel.send(':x: Due to Discord Limitations, I cannot delete messages older than 14 days')
            })

            let msg1 = await message.channel.send(`Deleted \`${amount}\` messages`)
            setTimeout(() => {
                msg1.delete()
            }, 2000)
        }
        else {
            let msg2 = await message.channel.send("You don't have enough permissions to execute this command!")
            setTimeout(() => {
                msg2.delete()
                message.delete()
            }, 2000)
        }
    }
}