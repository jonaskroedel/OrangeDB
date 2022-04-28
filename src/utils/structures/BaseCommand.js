module.exports = class BaseCommand {
    constructor (name, category, aliases, connection) {
        this.name = name;
        this.category = category;
        this.aliases = aliases;
    }
}