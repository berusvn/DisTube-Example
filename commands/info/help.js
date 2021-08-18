const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "help",
    category: "info",
    aliases: [ "h" ],
    description: "Return all commands, or one specific command",
    args: false,
    usage: "",
    permission: [],
    owner: false,
    async execute(message, args) {
        const embed = new MessageEmbed()
            .setColor(message.client.color)
            .setThumbnail(message.client.user.displayAvatarURL())
            .setFooter(`Request by: ${message.author.tag}`, message.author.displayAvatarURL())
            .setDescription(`${message.client.emoji.info} **Daftar Command**\n
${message.client.emoji.folderinfo} **Info Command**
**help** - Menampilkan semua perintah.
**ping** - Memeriksa koneksi bot.
**status** - Memeriksa status bot.

${message.client.emoji.foldermusic} **Music Command**
**autoplay** - Menjalankan autoplay musik.
**filter** - Filter yang tersedia untuk kalian.
**join** - Bergabung ke voice channel.
**leave** - Meninggalkan voice channel.
**loop** - Mengulang lagu.
**lyrics** - Menampilkan lirik lagu yang sedang di putar.
**nowplaying** - Menampilkan info lagu yang sedang di putar.
**pause** - Menjeda lagu yang sedang di putar.
**play** - Memainkan lagu.
**previous** - Memainkan lagu sebelumnya.
**queue** - Menampilkan antrian lagu.
**resume** - Melanjutkan lagu yang terjeda.
**shuffle** - Mengacak antrian.
**skip** - Melompati lagu yang sedang di putar.
**skipto** - Melompati beberapa lagu yang sedang di putar.
**stop** - Menghentikan lagu dan membersihkan antrian.
**volume** - Mengubah volume.`);
        message.channel.send({ embeds: [embed] });
    }
};