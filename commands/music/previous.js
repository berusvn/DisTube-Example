const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "previous",
    category: "music",
    aliases: [ ],
    description: "previous Music",
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

        message.client.distube.previous(message)
            .then(song => {
                let thing = new MessageEmbed()
                    .setColor(message.client.color)
                    .setDescription(`${message.client.emoji.previous} Play **previous** song.`)
                    .setFooter(`Request by ${message.author.tag}`, message.author.displayAvatarURL());
                message.channel.send({ embeds: [thing] });
            });

    }
}