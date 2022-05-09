const BaseEvent = require('../../utils/structures/BaseEvent');
const StateManager = require('../../utils/StateManager');
const {VoiceState, MessageEmbed} = require("discord.js");



let timer;

/*
    © Jonas Krödel 2022
    You may use and modify this code. You must mention me, the owner,
    and you may not pass off the code as your own!
*/

module.exports = class MessageEvent extends BaseEvent {
    constructor() {
        super('voiceStateUpdate');
        this.connection = StateManager.connection;
    }

    async run(client, oldState, newState) {
        // get guild and player
        let guildId = newState.guild.id;
        const player = client.manager.get(guildId);

        if (player && player.state === "CONNECTED") {
            if (!player.twentyFourSeven) {
                let timeout = 3e5

                const runTimer = () => {
                    timer = setTimeout(
                        async () => {
                            player.destroy();
                            let emb = new MessageEmbed()
                                .setTitle(`Leaving VC`)
                                .setColor("RED")
                                .setDescription(`Player left because no one was in the VC for ${timeout / 1000} seconds`);
                            let msg = await client.channels.cache.get(player.textChannel).send({embeds: [emb]});
                            setTimeout(() => {
                                msg.delete()
                            }, 5000)
                        }, timeout
                    )
                }

                // check if the bot is active (playing, paused or empty does not matter (return otherwise)
                if (!player || player.state !== "CONNECTED") return;

                // prepreoces the data
                const stateChange = {};
                // get the state change
                if (oldState.channel === null && newState.channel !== null)
                    stateChange.type = "JOIN";
                if (oldState.channel !== null && newState.channel === null)
                    stateChange.type = "LEAVE";
                if (oldState.channel !== null && newState.channel !== null)
                    stateChange.type = "MOVE";
                if (oldState.channel === null && newState.channel === null) return; // you never know, right
                if (newState.serverMute === true && oldState.serverMute === false)
                    return player.pause(true);
                if (newState.serverMute === false && oldState.serverMute === true)
                    return player.pause(false);
                // move check first as it changes type
                if (stateChange.type === "MOVE") {
                    if (oldState.channel.id === player.voiceChannel) stateChange.type = "LEAVE";
                    if (newState.channel.id === player.voiceChannel) stateChange.type = "JOIN";
                }
                // double triggered on purpose for MOVE events
                if (stateChange.type === "JOIN") stateChange.channel = newState.channel;
                if (stateChange.type === "LEAVE") stateChange.channel = oldState.channel;

                // check if the bot's voice channel is involved (return otherwise)
                if (!stateChange.channel || stateChange.channel.id !== player.voiceChannel)
                    return;

                // filter current users based on being a bot
                stateChange.members = stateChange.channel.members.filter(
                    (member) => !member.user.bot
                );

                switch (stateChange.type) {
                    case "JOIN":
                        if (stateChange.members.size === 1 && player.paused) {
                            let emb = new MessageEmbed()
                                .setTitle(`Resumed ${player.queue.current.title}`)
                                .setColor("GREEN")
                                .setDescription(`Resuming playback because a user joined the voice`);
                            let msg = await client.channels.cache.get(player.textChannel).send({embeds: [emb]});

                            player.pause(false);

                            clearTimeout(timer);

                            setTimeout(() => {
                                msg.delete()
                            }, 5000)
                        }
                        break;
                    case "LEAVE":
                        if (stateChange.members.size === 0 && !player.paused && player.playing) {

                            player.pause(true);

                            let emb = new MessageEmbed()
                                .setTitle(`Paused ${player.queue.current.title}`)
                                .setColor("RED")
                                .setDescription(`Player paused to save bandwidth. That stuff does not grow on trees!`);
                            let msg = await client.channels.cache.get(player.textChannel).send({embeds: [emb]});


                            runTimer();

                            setTimeout(() => {
                                msg.delete()
                            }, 5000)
                        }
                        break;
                }
            }
        }
    }
}