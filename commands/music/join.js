const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "join",
    category: "music",
    aliases: [ "j" ],
    description: "Join Voice Channel",
    args: false,
    usage: "",
    permission: [],
    owner: false,
	memberVC: true,
    clientVC: false,
    sameVC: false,
    queueVC: false,
    execute(message, args) {

        const clientVoice = message.guild.me.voice.channel;
        const memberVoice = message.member.voice.channel;
		
		if (clientVoice) {
			if (clientVoice !== memberVoice) {
				let thing = new MessageEmbed()
					.setColor("RED")
					.setDescription(`${message.client.emoji.warn} You must be in the same channel as ${message.client.user}`);
				return message.channel.send({ embeds: [thing] });
			} else {
				let thing = new MessageEmbed()
					.setColor("RED")
					.setDescription(`${message.client.emoji.warn} I'm already on your voice channel`);
				return message.channel.send({ embeds: [thing] });
			}
		} else {
			if (memberVoice) {
				message.client.distube.voices.join(memberVoice)
					.then(voice => {
						let thing = new MessageEmbed()
							.setColor(message.client.color)
							.setDescription(`${message.client.emoji.join} **Join** the voice channel.`)
							.setFooter(`Request by ${message.author.tag}`, message.author.displayAvatarURL());
						message.channel.send({ embeds: [thing] });
					})
					.catch(error => {
						console.log(error);
						let thing = new MessageEmbed()
							.setColor("RED")
							.setDescription(`${message.client.emoji.warn} An error occurred while trying to join the voice channel.\nTry using the **Play** command.`);
						return message.channel.send({ embeds: [thing] });
					})

				
			} else {
				let thing = new MessageEmbed()
					.setColor("RED")
					.setDescription(`${message.client.emoji.warn} You must be in a voice channel!`);
				return message.channel.send({ embeds: [thing] });
			}
		}

    }
}