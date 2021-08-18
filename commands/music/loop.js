const { MessageEmbed } = require("discord.js");
const { status } = require("../../utils/distube.js");

module.exports = {
    name: "loop",
    category: "music",
    aliases: [ "repeat" ],
    description: "Stop Music",
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

        let repeatMode;

        if (!args[0]) repeatMode = 1;
        if (args[0] && args[0] === "lagu") repeatMode = 1;
        if (args[0] && args[0] === "song") repeatMode = 1;
        if (args[0] && args[0] === "queue") repeatMode = 2;
        if (args[0] && args[0] === "all") repeatMode = 2;

        if (queue.repeatMode === 0) {
            if (repeatMode === 0) {
                message.client.distube.setRepeatMode(message, 1);
    
                let thing = new MessageEmbed()
                    .setColor(message.client.color)
                    .setDescription(`${message.client.emoji.loop} **Looping** a song.`)
                    .setFooter(`Request by ${message.author.tag}`, message.author.displayAvatarURL());
                message.channel.send({ embeds: [thing] });
            } else if (repeatMode === 1) {
                message.client.distube.setRepeatMode(message, 1);
    
                let thing = new MessageEmbed()
                    .setColor(message.client.color)
                    .setDescription(`${message.client.emoji.loop} **Looping** a song.`)
                    .setFooter(`Request by ${message.author.tag}`, message.author.displayAvatarURL());
                message.channel.send({ embeds: [thing] });
            } else if (repeatMode === 2) {
                message.client.distube.setRepeatMode(message, 2);
    
                let thing = new MessageEmbed()
                    .setColor(message.client.color)
                    .setDescription(`${message.client.emoji.loop} **Looping** all the queue.`)
                    .setFooter(`Request by ${message.author.tag}`, message.author.displayAvatarURL());
                message.channel.send({ embeds: [thing] });
            }
        } else {
            message.client.distube.setRepeatMode(message, 0);
    
            let thing = new MessageEmbed()
                .setColor(message.client.color)
                .setDescription(`${message.client.emoji.loop} Stop **looping** song.`)
                .setFooter(`Request by ${message.author.tag}`, message.author.displayAvatarURL());
            message.channel.send({ embeds: [thing] });
        }
    }
}