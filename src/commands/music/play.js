const BaseCommand = require('../../utils/structures/BaseCommand');
const {MessageEmbed} = require("discord.js");

module.exports = class JoinCommand extends BaseCommand {
    constructor() {
        super('play', 'music', []);
    }
    async run (client, message, args) {
        const query = args.join(' ');
        console.log(query);
        const { channel } = message.member.voice;
        if (channel) {
            let i = 0;
            const searchResults = await client.manager.search(query, message.author);
            const tracks = searchResults.tracks.slice(0, 10);
            const tracksInfo = tracks.map(r => `${++i}) ${r.title} - ${r.uri}`).join('\n');

            const sEmbed = new MessageEmbed()
                .setDescription(tracksInfo)
                .setFooter({text: `Music Results for ${message.author.username}`, iconURL: message.author.displayAvatarURL({dynamic: true})})

            message.channel.send({embeds: [sEmbed]});

            const filter = m => (message.author.id === m.author.id) && (m.content >= 1 && m.content <= tracks.length);

            try {
                const response = await message.channel
                    .awaitMessages(filter, { max: 1, time: 10000, errors: ['time']});

                if (response) {
                    const entry = response.first().content;
                    const player = client.manager.players.get(message.guild.id);
                    const track = tracks[entry-1];
                    player.queue.add(track);
                    message.channel.send(`Enqueueing track ${track.title}`);
                    if (!player.playing) player.play();
                }
            } catch (err) {
                console.log(err);
            }
        }
    }
}