const { MessageEmbed } = require("discord.js");

module.exports = async (client, message) => {

    let thing = new MessageEmbed()
        .setColor("RED")
        .setDescription(`❌ No more song in queue`)
    message.channel.send(thing);

}