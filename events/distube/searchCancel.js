const { MessageEmbed } = require("discord.js");

// If DisTubeOptions.searchSongs = true
module.exports = async (client, message, query) => {

    let thing = new MessageEmbed()
        .setColor("RED")
        .setDescription(`${client.emoji.warn} Searching canceled!`)
    message.channel.send({ embeds: [thing] });

}