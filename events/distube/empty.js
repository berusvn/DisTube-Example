const { MessageEmbed } = require("discord.js");

module.exports = async (client, queue) => {

    // If DisTubeOptions.leaveOnEmpty is true
    let thing = new MessageEmbed()
        .setColor("RED")
        .setDescription(`${client.emoji.warn} Channel is empty.`);
    queue.textChannel.send({ embeds: [thing] });

}