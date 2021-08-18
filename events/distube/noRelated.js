const { MessageEmbed } = require("discord.js");

module.exports = async (client, queue) => {

    let thing = new MessageEmbed()
        .setColor("RED")
        .setDescription(`${client.emoji.warn} Can't find related video to play. Stop playing music.`)
    queue.textChannel.send({ embeds: [thing] });

}