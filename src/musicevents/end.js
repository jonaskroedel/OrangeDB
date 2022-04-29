const BaseEvent = require('../utils/structures/BaseEvent');

/*
    © Jonas Krödel 2022
    You may use and modify this code. You must mention me, the owner,
    and you may not pass off the code as your own!
*/

module.exports = class QueueEndEvent extends BaseEvent {
    constructor() {
        super('queueEnd');
    }

    async run (client, player) {
        // player.textChannel.send("Queue has ended.");
        // client.music.players.destroy(player.guild.id);
    }
}