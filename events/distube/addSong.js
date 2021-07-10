const { MessageEmbed } = require("discord.js");
const { status } = require("../../utils/distube.js");

module.exports = async (client, message, queue, song) => {

    let thing = new MessageEmbed()
        .setColor(message.client.color)
        .setAuthor(message.client.user.username, message.client.user.displayAvatarURL())
        .setDescription(`🎵 Added **${song.name}** - \`[${song.formattedDuration}]\` to the queue`)
        .setThumbnail(song.thumbnail)
        .setFooter(status(message.author.tag, queue), message.author.displayAvatarURL());
    message.channel.send(thing);

}