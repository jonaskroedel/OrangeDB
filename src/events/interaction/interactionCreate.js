const BaseEvent = require('../../utils/structures/BaseEvent');
const StateManager = require('../../utils/StateManager');

/*
    © Jonas Krödel 2022
    You may use and modify this code. You must mention me, the owner,
    and you may not pass off the code as your own!
*/

module.exports = class InteractionEvent extends BaseEvent {
    constructor() {
        super('interactionCreate');
        this.connection = StateManager.connection;
    }
    async run (client, interaction) {

        if (!interaction.isCommand()) return;

        const command = client.slashCommands.get(interaction.commandName)
        if(!command) return;

        try {
            await command.execute(client, interaction)
        } catch (err) {
            console.log(err)

            await interaction.reply({
                content: `An error occurred while executing this command.`,
                ephemeral: true
            });
        }
    }
}