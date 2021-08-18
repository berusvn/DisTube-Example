const { MessageEmbed } = require("discord.js");
const { status } = require("../../utils/distube.js");

module.exports = async (client, message, query) => {

    let thing = new MessageEmbed()
        .setColor("RED")
        .setDescription(`${client.emoji.warn} No result found for ${query}!`)
    message.channel.send({ embeds: [thing] });

}