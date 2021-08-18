const { MessageEmbed } = require("discord.js");

module.exports = async (client, queue) => {

    let thing = new MessageEmbed()
        .setColor("RED")
        .setDescription(`${client.emoji.warn} No more song in queue`)
    queue.textChannel.send({ embeds: [thing] });

}