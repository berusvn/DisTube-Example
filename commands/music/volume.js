const { MessageEmbed } = require("discord.js");
const { status } = require("../../utils/distube.js");

module.exports = {
    name: "volume",
    category: "music",
    aliases: [ "v" ],
    description: "Set Volume",
    args: false,
    usage: "<Number of volume between 0 - 100>",
    permission: [],
    owner: false,
    memberVC: true,
    clientVC: true,
    sameVC: true,
    queueVC: true,
    execute(message, args) {
        const queue = message.client.distube.getQueue(message);

        let volume = parseInt(args[0]);

        if (!volume) {
            let thing = new MessageEmbed()
                .setColor(message.client.color)
                .setDescription(`${message.client.emoji.volume} Current **volume** : \`${queue.volume}\`%`)
                .setFooter(`Request by ${message.author.tag}`, message.author.displayAvatarURL());
            return message.channel.send({ embeds: [thing] });
        }

        if (isNaN(volume)) {
            let thing = new MessageEmbed()
                .setColor("RED")
                .setDescription(`${message.client.emoji.warn} Please enter a valid number!`);
            return message.channel.send({ embeds: [thing] });
        }

        if (volume < 0)  volume = 0;
        if (volume > 100) volume = 100;

        message.client.distube.setVolume(message, volume);

        let thing = new MessageEmbed()
            .setColor(message.client.color)
            .setDescription(`${message.client.emoji.volume} **Volume** set to \`${volume}\`%`)
            .setFooter(`Request by ${message.author.tag}`, message.author.displayAvatarURL());
        message.channel.send({ embeds: [thing] });

    }
}