const { MessageEmbed } = require("discord.js");
const { status } = require("../../utils/distube.js");

module.exports = async (client, message, queue, playlist) => {

    let thing = new MessageEmbed()
        .setColor(message.client.color)
        .setAuthor(message.client.user.username, message.client.user.displayAvatarURL())
        .setDescription(`Added **${playlist.title}** playlist (${playlist.total_items} songs) to the queue`)
        .setThumbnail(playlist.thumbnail)
        .setFooter(status(message.author.tag, queue), message.author.displayAvatarURL());
    message.channel.send(thing);

}