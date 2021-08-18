const { MessageEmbed } = require("discord.js");
const { status } = require("../../utils/distube.js");

module.exports = {
    name: "filter",
    category: "music",
    aliases: [ "eq", "equalizer" ],
    description: "Audio Filters",
    args: false,
    usage: "<`3d`, `bassboost`, `echo`, `karaoke`, `nightcore`, `vaporwave`, `off`>",
    permission: [],
    owner: false,
    memberVC: true,
    clientVC: true,
    sameVC: true,
    queueVC: true,
    execute(message, args) {
        const queue = message.client.distube.getQueue(message);

        if (! args[0]) {
            let thing = new MessageEmbed()
                .setColor("RED")
                .setDescription(`You didn't provide any arguments, ${message.author}!
Examples: \`${message.client.prefix}filter bassboost\`
Valid filter:\n\`3d\`, \`bassboost\`, \`echo\`, \`flanger\`, \`gate\`, \`haas\`, \`karaoke\`, \`nightcore\`, \`reverse\`, \`vaporwave\`, \`mcompand\`, \`phaser\`, \`tremolo\`, \`surround\`, \`earwax\``);
            message.channel.send({ embeds: [thing] });
        }

        let filter = ['3d', 'bassboost', 'echo', 'flanger', 'gate', 'haas', 'karaoke', 'nightcore', 'reverse', 'vaporwave', 'mcompand', 'phaser', 'tremolo', 'surround', 'earwax'];

        if (filter.includes(args[0])) {
            message.client.distube.setFilter(message, args[0], true);
    
            let thing = new MessageEmbed()
                .setColor(message.client.color)
                .setDescription(`${message.client.emoji.filter} Current queue filter: ${args[0]}.`)
                .setFooter(`Request by ${message.author.tag}`, message.author.displayAvatarURL());
            message.channel.send({ embeds: [thing] });
        } else if (args[0] === "off") {
            message.client.distube.setFilter(message, false, true);
    
            let thing = new MessageEmbed()
                .setColor(message.client.color)
                .setDescription(`${message.client.emoji.filter} disable queue filter.`)
                .setFooter(`Request by ${message.author.tag}`, message.author.displayAvatarURL());
            message.channel.send({ embeds: [thing] });
        } else {
            let thing = new MessageEmbed()
                .setColor("RED")
                .setDescription(`Valid filter:\n\`3d\`, \`bassboost\`, \`echo\`, \`flanger\`, \`gate\`, \`haas\`, \`karaoke\`, \`nightcore\`, \`reverse\`, \`vaporwave\`, \`mcompand\`, \`phaser\`, \`tremolo\`, \`surround\`, \`earwax\``);
            message.channel.send({ embeds: [thing] });
        }
    }
}