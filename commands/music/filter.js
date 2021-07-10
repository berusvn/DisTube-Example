const { MessageEmbed } = require("discord.js");
const { status } = require("../../utils/distube.js");

module.exports = {
    name: "filter",
    category: "music",
    aliases: [ "eq", "equalizer" ],
    description: "Audio Filters",
    args: true,
    usage: "<`3d`, `bassboost`, `echo`, `karaoke`, `nightcore`, `vaporwave`>",
    permission: [],
    owner: false,
    inVoiceChannel: true,
    sameVoiceChannel: true,
    execute(message, args) {
        const queue = message.client.distube.getQueue(message);

        if(!queue) {
            let thing = new MessageEmbed()
                .setColor("RED")
                .setDescription(`There is no music playing.`);
            return message.channel.send(thing);
        }

        if (args[0] === "off" && queue.filter) {
            message.client.distube.setFilter(message, queue.filter)
        } else if (Object.keys(client.distube.filters).includes(args[0])) {
            message.client.distube.setFilter(message, args[0])
        }

        let thing = new MessageEmbed()
            .setColor(message.client.color)
            .setAuthor(message.client.user.username, message.client.user.displayAvatarURL())
            .setDescription(`Current Queue Filter: **${queue.filter || "Off"}**`)
            .setFooter(status(message.author.tag, queue), message.author.displayAvatarURL());
        message.channel.send(thing);
    }
}