const { MessageEmbed } = require("discord.js");
const { status } = require("../../utils/distube.js");

module.exports = async (client, queue, song) => {

    let thing = new MessageEmbed()
        .setColor(client.color)
        .setDescription(`${client.emoji.addsong} Add Song \n[${song.name}](${song.url}) - \`[${song.formattedDuration}]\``)
        .setThumbnail(song.thumbnail)
        .setFooter(`Request by ${song.user.tag}`, song.user.displayAvatarURL());
    queue.textChannel.send({ embeds: [thing] });

}