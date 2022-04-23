const BaseEvent = require('../utils/structures/BaseEvent');

module.exports = class TimerEvent extends BaseEvent {
    constructor() {
        super('timerStart');
    }

    async run (client, player, track) {
        // player.textChannel.send(`Now playing: ${track.title}`);

    }
}