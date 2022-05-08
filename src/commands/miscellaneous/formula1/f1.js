const {Client, Intents, MessageEmbed, MessageButton} = require('discord.js');
const client = new Client({intents: [Intents.FLAGS.GUILDS, "GUILD_MESSAGES"]});
const BaseCommand = require("../../../utils/structures/BaseCommand");
const StateManager = require("../../../utils/StateManager");
const path = require('path');
const {PythonShell} = require('python-shell');

const mainpy = path.join(__dirname, 'main.py');
let pyshell = new PythonShell(mainpy)

const guildCommandPrefixes = new Map();

module.exports = class f1 extends BaseCommand {
    constructor() {
        super('f1', 'formula1', ['formel1']);
        this.connection = StateManager.connection;
    }

    async run(client, message) {
        const prefix = guildCommandPrefixes.get(message.guild.id)

        if (message.author.bot) return;
        const [cmdName, ...cmdArgs] = message.content.slice(prefix.length).split(/\s+/);

        if(cmdArgs.length === 0 || cmdArgs.length > 4) {
            const mainEmbed = new MessageEmbed()
                .setTitle(`Formula 1 Help Page`)
                .setColor("RED")
                .setDescription(`Please provide the data in that form:
                                \`driver id, Year, Race, RaceType\`
                                eg: 
                                ${prefix}f1 VER, 2022, Miami, Qualifying`)
                .setFooter({
                    text: `Requested by ${message.author.username}`,
                    iconURL: message.author.displayAvatarURL({dynamic: true})
                })
                .setTimestamp();
            return message.channel.send({ embeds: [mainEmbed] });
        }

        const driverId = cmdArgs[0];
        const year = cmdArgs[1];
        const race = cmdArgs[2];
        const raceType = cmdArgs[3];


        pyshell.send(JSON.stringify([driverId, year, raceType, race]));

        pyshell.on('message', function (message) {
            console.log(message);
        });

        pyshell.end(function (err,code,signal) {
            if (err) throw err;
            console.log('finished');
        });
    }
}
StateManager.on('prefixUpdate', (guildId, prefix) => {
    guildCommandPrefixes.set(guildId, prefix);
});
StateManager.on('prefixFetched', (guildId, prefix) => {
    guildCommandPrefixes.set(guildId, prefix);
});
StateManager.on('guildAdded', (guildId, prefix) => {
    guildCommandPrefixes.set(guildId, prefix);
});