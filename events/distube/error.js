const { status } = require("../../utils/distube.js");

module.exports = async (client, message, err) => {

    console.log(err)

    let thing = new MessageEmbed()
        .setColor("RED")
        .setDescription(`❌ An error encountered: \n${err}`)
    message.channel.send(thing);

}