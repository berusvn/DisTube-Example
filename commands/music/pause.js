const { MessageEmbed } = require("discord.js");
const { status } = require("../../utils/distube.js");

module.exports = {
    name: "pause",
    category: "music",
    aliases: [ ],
    description: "pause Music",
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
			let thing = new MessageEmbed()
				.setColor("RED")
				.setDescription(`${message.client.emoji.warn} The queue has been paused.`);
			message.channel.send({ embeds: [thing] });
		} else {
			message.client.distube.pause(message);

			let thing = new MessageEmbed()
				.setColor(message.client.color)
				.setDescription(`${message.client.emoji.pause} **Pause** a song.`)
				.setFooter(`Request by ${message.author.tag}`, message.author.displayAvatarURL());
			message.channel.send({ embeds: [thing] });
		}
    }
}