const BaseEvent = require('../utils/structures/BaseEvent');

/*
    © Jonas Krödel 2022
    You may use and modify this code. You must mention me, the owner,
    and you may not pass off the code as your own!
*/

module.exports = class TimerEvent extends BaseEvent {
    constructor() {
        super('timerStart');
    }

    async run (client, player, track) {
        // player.textChannel.send(`Now playing: ${track.title}`);

    }
}