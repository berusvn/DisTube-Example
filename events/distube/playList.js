const { MessageEmbed } = require("discord.js");
const { status } = require("../../utils/distube.js");

module.exports = async (client, message, queue, playlist, song) => {

    let thing = new MessageEmbed()
        .setColor(message.client.color)
        .setAuthor(message.client.user.username, message.client.user.displayAvatarURL())
        .setDescription(`🎶 Start playing playlist \n[${playlist.name}](${playlist.url}) \nTotal : ${playlist.songs.length} songs. \n\n🎵 Start playing \n[${song.name}](${song.url}) - \`[${song.formattedDuration}]\``)
        .setThumbnail(playlist.thumbnail.url)
        .setFooter(status(message.author.tag, queue), message.author.displayAvatarURL());
    message.channel.send(thing);

}