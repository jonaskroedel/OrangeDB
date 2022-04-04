require('dotenv').config({path: '../.env'})
const {Client, Intents} = require('discord.js')
const client = new Client({intents: [Intents.FLAGS.GUILDS]})
let connection;

client.on('ready', () => console.log(`${client.user.tag} logged in.`));

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

client.on('message', )

(async () => {
    connection = await require('../database/db')
    await client.login(process.env.BOT_TOKEN)
})()