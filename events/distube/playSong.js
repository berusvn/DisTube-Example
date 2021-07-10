const { status } = require("../../utils/distube.js");

module.exports = async (client, message, queue, song) => {

    let thing = new MessageEmbed()
        .setColor(message.client.color)
        .setAuthor(message.client.user.username, message.client.user.displayAvatarURL())
        .setDescription(`🎵 Started Playing **${song.name}** - \`[${song.formattedDuration}]\``)
        .setThumbnail(song.thumbnail)
        .setFooter(`Request by: ${message.author.tag} ~ ${status(queue)}`, message.author.displayAvatarURL());
    message.channel.send(thing);

}