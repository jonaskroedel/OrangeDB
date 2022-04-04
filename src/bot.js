require('dotenv').config({path: '../.env'});
const {Client, Intents} = require('discord.js');
const client = new Client({intents: [Intents.FLAGS.GUILDS, "GUILD_MESSAGES"]});
let connection;

const guildCommandPrefixes = new Map();

client.on('ready', () => {
    console.log(`${client.user.tag} logged in.`);
    client.guilds.cache.forEach(guild => {
       connection.query(
           `SELECT cmdPrefix FROM GuildConfigurable WHERE guildID = '${guild.id}'`
       ).then(result => {
           guildCommandPrefixes.set(guild.id, result[0][0].cmdPrefix);
       }).catch(err => console.log(err));
    });
});

client.on('guildCreate', async (guild) => {
    try {
        await connection.query(
            `INSERT INTO Guilds VALUES ('${guild.id}', ${guild.ownerId})`
        );
        await connection.query(
            `INSERT INTO GuildConfigurable (guildId) VALUES ('${guild.id}')`
        );
    } catch (err) {
        console.log(err);
    }
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    const prefix = guildCommandPrefixes.get(message.guild.id);
    if(message.content.toLowerCase().startsWith(prefix + 'help')) {
        await message.channel.send(`test + ${prefix}`);
    } else if (message.content.toLowerCase().startsWith(prefix + 'prefix')) {
        if(message.member.permissions.has("MANAGE_GUILD")) {
            const [ cmdName, newPrefix] = message.content.split(" ");
            if(newPrefix) {
                try {
                    await connection.query(
                        `UPDATE GuildConfigurable SET cmdPrefix = '${newPrefix}' WHERE guildId = '${message.guild.id}'`
                    );
                    guildCommandPrefixes.set(message.guild.id, newPrefix);
                    message.channel.send(`Updated the guild prefix to ${newPrefix}`);
                } catch(err) {
                    console.log(err);
                    message.channel.send(`An error occurred while updating the prefix to ${newPrefix}`)
                }
            } else message.channel.send('You must only specify a maximum of 1 prefix.')
        } else message.channel.send('You do not have enough permission to do that.');
    }
});

(async () => {
    connection = await require('../database/db');
    await client.login(process.env.BOT_TOKEN);
})();