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



        pyshell.send(JSON.stringify(['VER', 2022, 'Q', 'Sakhir']));

        pyshell.on('message', function (message) {
            console.log(message);
        });

        pyshell.end(function (err,code,signal) {
            if (err) throw err;
            console.log('finished');
        });
    }
}