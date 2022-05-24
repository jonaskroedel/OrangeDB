const BaseCommand = require('../../../utils/structures/BaseCommand');

module.exports = class JoinCommand extends BaseCommand {
    constructor() {
        super('join', 'music', []);
    }
    async run (client, message, args) {
        const { channel } = message.member.voice;

        if (channel) {
            const player = client.manager.create({
                guild: message.guild.id,
                voiceChannel: message.member.voice.channel.id,
                textChannel: message.channel.id,
                selfDeafen: true,
            });
            player.connect();
            client.musicPlayers.set(message.guild.id, player);
        } else {
            message.channel.send('You need to join a voicechannel first to play music.');
        }
    }
}