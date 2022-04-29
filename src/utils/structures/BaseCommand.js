/*
    © Jonas Krödel 2022
    You may use and modify this code. You must mention me, the owner,
    and you may not pass off the code as your own!
*/

module.exports = class BaseCommand {
    constructor (name, category, aliases, description) {
        this.name = name;
        this.category = category;
        this.aliases = aliases;
        this.description = description
    }
}