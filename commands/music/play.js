const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "play",
    category: "music",
    aliases: [ "p" ],
    description: "Play Music",
    args: true,
    usage: "<YouTube URL | Video Name | Spotify URL>",
    permission: [],
    owner: false,
    inVoiceChannel: true,
    sameVoiceChannel: false,
    memberVC: true,
    clientVC: false,
    sameVC: false,
    queueVC: false,
    execute(message, args) {

        const clientVoice = message.guild.me.voice.channel;
        const memberVoice = message.member.voice.channel;

        if (clientVoice) {
            if (clientVoice === memberVoice) {
                message.client.distube.play(message, args.join(' '));
            } else {
                let thing = new MessageEmbed()
                    .setColor("RED")
                    .setDescription(`${message.client.emoji.warn} You must be in the same channel as ${message.client.user}`);
                message.channel.send({ embeds: [thing] });
            }
        } else {
            message.client.distube.play(message, args.join(' '));
        }

    }
}