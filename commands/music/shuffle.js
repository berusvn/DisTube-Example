const { MessageEmbed } = require("discord.js");
const { status } = require("../../utils/distube.js");

module.exports = {
    name: "shuffle",
    category: "music",
    aliases: [],
    description: "Shuffle Music",
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

        message.client.distube.shuffle(message)
            .then(queue => {
                let thing = new MessageEmbed()
                    .setColor(message.client.color)
                    .setDescription(`${message.client.emoji.shuffle} **Shuffle** queue.`)
                    .setFooter(`Request by ${message.author.tag}`, message.author.displayAvatarURL());
                message.channel.send({ embeds: [thing] });
            })

        
    }
}