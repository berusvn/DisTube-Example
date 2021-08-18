const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "search",
    category: "music",
    aliases: [ ],
    description: "Search Music",
    args: true,
    usage: "<Video Name>",
    permission: [],
    owner: false,
    memberVC: true,
    clientVC: false,
    sameVC: false,
    queueVC: false,
    execute(message, args) {

        const clientVoice = message.guild.me.voice.channel;
        const memberVoice = message.member.voice.channel;

        if (clientVoice) {
            if (clientVoice === memberVoice) {
                message.client.distube.search(args.join(' '), {
                    limit: 10,
                    type: "video",
                    safeSearch: false,
                });
            } else {
                let thing = new MessageEmbed()
                    .setColor("RED")
                    .setDescription(`${message.client.emoji.warn} You must be in the same channel as ${message.client.user}`);
                message.channel.send({ embeds: [thing] });
            }
        } else {
            message.client.distube.search(args.join(' '), {
                limit: 10,
                type: "video",
                safeSearch: false,
            });
        }

    }
}