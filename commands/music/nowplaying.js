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
    inVoiceChannel: false,
    sameVoiceChannel: false,
    execute(message, args) {
        const queue = message.client.distube.getQueue(message);

        if(!queue) {
            let thing = new MessageEmbed()
                .setColor("RED")
                .setDescription(`❌ There is no music playing.`);
            return message.channel.send(thing);
        }

        const currentSong = message.client.distube.getQueue(message).songs[0];

        // Progress Bar
        var total = currentSong.duration * 1000;
        var current = queue.currentTime;
        var size = 30;
        var line = '─';
        var slider = '🎵';

        let thing = new MessageEmbed()
            .setDescription(`🎵 **Now Playing**\n[${currentSong.name}](${currentSong.url}) - \`[${currentSong.formattedDuration}]\``)
            .setThumbnail(currentSong.thumbnail)
            .setColor(message.client.color)
            .addField("\u200b", progressbar(total, current, size, line, slider))
            .addField("\u200b", `\`${convertTime(current)} / ${convertTime(total)}\``)
            .setFooter(status(message.author.tag, queue), message.author.displayAvatarURL());
        message.channel.send(thing);

    }
}