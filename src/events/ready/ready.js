const BaseEvent = require('../../utils/structures/BaseEvent');

module.exports = class ReadyEvent extends BaseEvent {
    constructor() {
        super ('ready');
    }

    async run(bot, message) {
        console.log(bot.user.tag + 'has logged in.');

    }
}