const { status } = require("../../utils/distube.js");

module.exports = async (client, message) => {

    // If DisTubeOptions.leaveOnEmpty is true
    let thing = new MessageEmbed()
        .setColor("RED")
        .setDescription(`❌Channel is empty. \nLeaving the channel`)
    message.channel.send(thing);

}