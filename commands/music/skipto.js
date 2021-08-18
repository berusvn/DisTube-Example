const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "skipto",
    category: "music",
    aliases: [ "jump" ],
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

        if (isNaN(args[0])) {
            let thing = new MessageEmbed()
                .setColor("RED")
                .setDescription(`${message.client.emoji.warn} Please enter a valid number!`);
            return message.channel.send({ embeds: [thing] });
        }

        message.client.distube.jump(message, parseInt(args[0]))
            .then(queue => {
                let thing = new MessageEmbed()
                    .setColor(message.client.color)
                    .setDescription(`${message.client.emoji.skipto} **Skip** ${args[0]} songs.`)
                    .setFooter(`Request by ${message.author.tag}`, message.author.displayAvatarURL());
                message.channel.send({ embeds: [thing] });
            });
    }
}