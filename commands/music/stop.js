const { MessageEmbed } = require("discord.js");
const { status } = require("../../utils/distube.js");

module.exports = {
    name: "stop",
    category: "music",
    aliases: [],
    description: "Stop Music",
    args: false,
    usage: "",
    permission: [],
    owner: false,
    inVoiceChannel: true,
    sameVoiceChannel: true,
    memberVC: true,
    clientVC: true,
    sameVC: true,
    queueVC: true,
    execute(message, args) {
        const queue = message.client.distube.getQueue(message);

        message.client.distube.stop(message);

        let thing = new MessageEmbed()
            .setColor(message.client.color)
            .setDescription(`${message.client.emoji.stop} **Stopped** the music.`)
            .setFooter(`Request by ${message.author.tag}`, message.author.displayAvatarURL());
        message.channel.send({ embeds: [thing] });

    }
}