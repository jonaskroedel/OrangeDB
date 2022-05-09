const {Client, Intents, MessageEmbed, MessageButton} = require('discord.js');
const client = new Client({intents: [Intents.FLAGS.GUILDS, "GUILD_MESSAGES"]});
const BaseCommand = require("../../utils/structures/BaseCommand");
const StateManager = require("../../utils/StateManager");
const path = require('path');
const {PythonShell} = require('python-shell');

const myPythonScript = path.join(__dirname, 'main.py');

module.exports = class f1 extends BaseCommand {
    constructor() {
        super('f1', 'formula1', ['formel1']);
        this.connection = StateManager.connection;
    }

    async run(client, message) {
        let msgContent;
        let pyshell = new PythonShell(myPythonScript);

        pyshell.send(JSON.stringify(['NOR',2022,'Miami','R']));

        pyshell.on('message', function (message) {
            // received a message sent from the Python script (a simple "print" statement)
            console.log(message);
            msgContent += message;
        });

        // end the input stream and allow the process to exit
        pyshell.end(function (err) {
            if (err) {
                throw err;
            }
            console.log('finished');
            console.log(msgContent)


            const sEmbed = new MessageEmbed()
                .setTitle(`Requested driver id's`)
                .setDescription(msgContent)
                .setColor("RED")
                .setFooter({
                    text: `Requested by ${message.author.username}`,
                    iconURL: message.author.displayAvatarURL({dynamic: true})
                })
                .setTimestamp();
            message.channel.send({embeds: [sEmbed]});
        });
    }
}