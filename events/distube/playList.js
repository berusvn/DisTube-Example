const { MessageEmbed } = require("discord.js");
const { status } = require("../../utils/distube.js");

module.exports = async (client, message, queue, playlist, song) => {

    let thing = new MessageEmbed()
        .setColor(message.client.color)
        .setAuthor(message.client.user.username, message.client.user.displayAvatarURL())
        .setDescription(`🎶 Play **${playlist.title}** playlist (${playlist.total_items} songs)\nNow playing **${song.name}** - \`[${song.formattedDuration}]\``)
        .setThumbnail(playlist.thumbnail)
        .setFooter(status(message.author.tag, queue), message.author.displayAvatarURL());
    message.channel.send(thing);

}