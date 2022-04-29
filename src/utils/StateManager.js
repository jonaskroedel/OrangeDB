const { EventEmitter } = require('events');
const connection = require('../../database/db');

/*
    © Jonas Krödel 2022
    You may use and modify this code. You must mention me, the owner,
    and you may not pass off the code as your own!
*/

class StateManager extends EventEmitter {
    constructor (opts) {
        super(opts);
        connection
            .then((connection) => {
                this.connection = connection;
            }).catch(err => console.log(err));
    }
}

module.exports = new StateManager();