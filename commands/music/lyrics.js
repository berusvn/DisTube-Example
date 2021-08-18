const { MessageEmbed } = require("discord.js");
const lyricsFinder = require("lyrics-finder");

module.exports = {
    name: "lyrics",
    category: "music",
    aliases: [ "ly" ],
    description: "Lyric Music",
    args: false,
    usage: "",
    permission: [],
    owner: false,
    memberVC: true,
    clientVC: true,
    sameVC: true,
    queueVC: true,
    async execute(message, args) {
        const queue = message.client.distube.getQueue(message);

        let song = args.join(" ");
		let currentSong = queue.songs[0];
        if (!song && currentSong) song = currentSong.name;

        let lyrics = null;

        try {
            lyrics = await lyricsFinder(song, "");
            if (!lyrics) lyrics = `${message.client.emoji.warn}  No lyrics found.`;
        } catch (error) {
            console.error(error)
            lyrics = `Usage: ${message.client.prefix}ly <Song Name>`;
        }

        let lyricsEmbed = new MessageEmbed()
            .setColor(message.client.color)
            .setDescription(`**Lyrics** of **${song}**\n${lyrics}`)
            .setFooter(`Request by ${message.author.tag}`, message.author.displayAvatarURL());

        if (lyricsEmbed.description.length >= 2048) lyricsEmbed.description = `${lyricsEmbed.description.substr(0, 2045)}...`;
        
		message.channel.send({ embeds: [lyricsEmbed] })
            .then(m => {
                var total = queue.song[0].duration * 1000;
                var current = queue.currentTime * 1000;
                let time = total - current;
                setTimeout(() => { m.delete() }, time);
            });
    }
}