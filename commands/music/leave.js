const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "leave",
    category: "music",
    aliases: [ "dc" ],
    description: "Leave Voice Channel",
    args: false,
    usage: "",
    permission: [],
    owner: false,
    memberVC: true,
    clientVC: true,
    sameVC: true,
    queueVC: false,
    execute(message, args) {

        const queue = message.client.distube.getQueue(message);
        const clientVoice = message.guild.me.voice.channel;
        const memberVoice = message.member.voice.channel;

        if (clientVoice === memberVoice) {
            
            if (queue) {
                message.client.distube.stop(message);
                message.client.distube.voices.leave(message.guild);
            } else {
                message.client.distube.voices.leave(message.guild);
            }

        }

    }
}
