const BaseEvent = require('../utils/structures/BaseEvent');

/*
    © Jonas Krödel 2022
    You may use and modify this code. You must mention me, the owner,
    and you may not pass off the code as your own!
*/

module.exports = class NodeErrorEvent extends BaseEvent {
    constructor() {
        super('nodeError');
    }

    async run (client, node, error) {
        console.log(`An error has occured`);
        console.log(error.message);
    }
}