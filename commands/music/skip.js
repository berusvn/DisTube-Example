const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "skip",
    category: "music",
    aliases: [ "s" ],
    description: "Skip Music",
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

        if (queue.songs.length === 1) {
            message.client.distube.stop(message)
                .then(song => {
                    let thing = new MessageEmbed()
                        .setColor(message.client.color)
                        .setDescription(`${message.client.emoji.skip} **Skip** a song.`)
                        .setFooter(`Request by ${message.author.tag}`, message.author.displayAvatarURL());
                    message.channel.send({ embeds: [thing] });
                });
        } else {
            message.client.distube.skip(message)
                .then(song => {
                    let thing = new MessageEmbed()
                        .setColor(message.client.color)
                        .setDescription(`${message.client.emoji.skip} **Skip** a song.`)
                        .setFooter(`Request by ${message.author.tag}`, message.author.displayAvatarURL());
                    message.channel.send({ embeds: [thing] });
                });
        }
    }
}