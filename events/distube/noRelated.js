const { MessageEmbed } = require("discord.js");

module.exports = async (client, message) => {

    let thing = new MessageEmbed()
        .setColor("RED")
        .setDescription(`❌ Can't find related video to play. Stop playing music.`)
    message.channel.send(thing);

}