module.exports = class BaseCommand {
    constructor (name, category, aliases, description) {
        this.name = name;
        this.category = category;
        this.aliases = aliases;
        this.description = description
    }
}