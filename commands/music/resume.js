const { MessageEmbed } = require("discord.js");
const { status } = require("../../utils/distube.js");

module.exports = {
    name: "resume",
    category: "music",
    aliases: [],
    description: "Resume Music",
    args: false,
    usage: "",
    permission: [],
    owner: false,
    memberVC: true,
    clientVC: true,
    sameVC: true,
    queueVC: true,
    execute(message, args) {
        const queue = message.client.distube.getQueue(message);
		
		if (queue.paused) { 
			message.client.distube.resume(message);

			let thing = new MessageEmbed()
				.setColor(message.client.color)
				.setDescription(`${message.client.emoji.resume} **Resume** a song.`)
				.setFooter(`Request by ${message.author.tag}`, message.author.displayAvatarURL());
			message.channel.send({ embeds: [thing] });
		} else {
			let thing = new MessageEmbed()
				.setColor("RED")
				.setDescription(`${message.client.emoji.warn} The queue has been played.`);
			message.channel.send({ embeds: [thing] });
		}
    }
}