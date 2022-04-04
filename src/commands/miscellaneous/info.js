const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class BanCommand extends BaseCommand {
    constructor() {
        super('info', 'moderation', []);
    }

    run () {
        console.log(this.name + ' was invoked');
    }
}