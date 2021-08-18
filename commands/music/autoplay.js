const { MessageEmbed } = require("discord.js");
const { status } = require("../../utils/distube.js");

module.exports = {
    name: "autoplay",
    category: "music",
    aliases: [ "ap" ],
    description: "AutoPlay Music",
    args: false,
    usage: "",
    permission: [],
    owner: false,
    memberVC: true,
    clientVC: true,
    sameVC: true,
    queueVC: true,
    execute(message, args) {
        const queue = message.client.distube.getQueue(message);

        if (!queue.autoplay) {
            message.client.distube.toggleAutoplay(message);
    
            let thing = new MessageEmbed()
                .setColor(message.client.color)
                .setDescription(`${message.client.emoji.autoplay} Activate **autoplay** mode.`)
                .setFooter(`Request by ${message.author.tag}`, message.author.displayAvatarURL());
            message.channel.send({ embeds: [thing] });
        } else {
            message.client.distube.toggleAutoplay(message);

            let thing = new MessageEmbed()
                .setColor(message.client.color)
                .setDescription(`${message.client.emoji.autoplay} Disable **autoplay** mode.`)
                .setFooter(`Request by ${message.author.tag}`, message.author.displayAvatarURL());
            message.channel.send({ embeds: [thing] });
        }
    }
}