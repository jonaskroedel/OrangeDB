const {Client, Intents, MessageEmbed, MessageButton} = require('discord.js');
const client = new Client({intents: [Intents.FLAGS.GUILDS, "GUILD_MESSAGES"]});
const BaseCommand = require("../../../utils/structures/BaseCommand");
const StateManager = require("../../../utils/StateManager");
const path = require('path');
const {PythonShell} = require('python-shell');

const myPythonScript = path.join(__dirname, 'main.py');

const guildCommandPrefixes = new Map();

module.exports = class f1 extends BaseCommand {
    constructor() {
        super('f1', 'formula1', ['formel1']);
        this.connection = StateManager.connection;
    }

    async run(client, message) {
        const msgContent = [];
        let pyshell = new PythonShell(myPythonScript);

        pyshell.send(JSON.stringify(['NOR',2022,'Miami','R']));

        pyshell.on('message', function (message) {
            // received a message sent from the Python script (a simple "print" statement)
            console.log(message);
            msgContent.push(message);
        });

        // end the input stream and allow the process to exit
        pyshell.end(async function (err) {
            if (err) {
                throw err;
            }
            ;
            console.log('finished');
            let result;
            let msg = '';

            String.prototype.interpolate = function (params) {
                const names = Object.keys(params);
                const vals = Object.values(params);
                return new Function(...names, `return \`${this}\`;`)(...vals);
            }

            for (let i = 0; i < msgContent.size; i++) {
                const template = '${driverId}\\n';
                result = template.interpolate({
                    driverId: msgContent[i]
                });

                msg += result;
            }

            const sEmbed = new MessageEmbed()
                .setTitle(`Requested driver id's`)
                .addField(msg)
                .setColor("RED")
                .setFooter({
                    text: `Requested by ${message.author.username}`,
                    iconURL: message.author.displayAvatarURL({dynamic: true})
                })
                .setTimestamp();
            await message.channel.send({embeds: [sEmbed]});
        });
    }
}