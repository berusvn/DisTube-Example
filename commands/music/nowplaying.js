const { MessageEmbed } = require("discord.js");
const { status } = require("../../utils/distube.js");
const { convertTime } = require('../../utils/convert.js');
const { progressbar } = require('../../utils/progressbar.js')

module.exports = {
    name: "nowplaying",
    category: "music",
    aliases: [ "np" ],
    description: "Show playing song",
    args: false,
    usage: "",
    permission: [],
    owner: false,
    memberVC: false,
    clientVC: true,
    sameVC: false,
    queueVC: true,
    execute(message, args) {
        const queue = message.client.distube.getQueue(message);

        const currentSong = queue.songs[0];

        // Progress Bar
        var total = currentSong.duration * 1000;
        var current = queue.currentTime * 1000;
        var size = 30;
        var line = '─';
        var slider = message.client.emoji.note;

        let thing = new MessageEmbed()
            .setDescription(`${message.client.emoji.music} **Now Playing**\n[${currentSong.name}](${currentSong.url}) - \`[${currentSong.formattedDuration}]\``)
            .setThumbnail(currentSong.thumbnail)
            .setColor(message.client.color)
            .addField("\u200b", progressbar(total, current, size, line, slider))
            .addField("\u200b", `\`${convertTime(current)} / ${convertTime(total)}\``)
            .setFooter(`Request by ${message.author.tag} • ${status(queue)}`, message.author.displayAvatarURL());
        message.channel.send({ embeds: [thing] });

    }
}