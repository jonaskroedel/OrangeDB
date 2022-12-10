const BaseCommand = require("../../../utils/structures/BaseCommand");
const { inspect } = require('util')

module.exports = class ping extends BaseCommand {
    constructor() {
        super('eval', 'test', [], '');
    }

    async run(client, message, args) {

        console.oldLog = console.log;
        console.log = function(value) {
            console.oldLog(value)
            return value
        }


        if (message.author.bot) return;
        const code = args.join(" ")
        if (!code) return message.reply('Please provide some code to evaluate')

        try {
            const result = await eval(code)
            let output = result
            if (typeof result !== 'string') {
                output = inspect(result)
            }

            message.channel.send({
                content: output,
                code: "js"})
        } catch (e) {
            message.channel.send('Evaluated content is too long to display')
            console.log(e)
        }
    }
}