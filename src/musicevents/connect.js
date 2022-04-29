const BaseEvent = require('../utils/structures/BaseEvent');

/*
    © Jonas Krödel 2022
    You may use and modify this code. You must mention me, the owner,
    and you may not pass off the code as your own!
*/

module.exports = class NodeConnectEvent extends BaseEvent {
    constructor () {
        super('nodeConnect');
    }

    async run (client, node) {
        console.log(`Node "${node.options.identifier}" connected.`);
    }
}