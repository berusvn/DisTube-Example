const { MessageEmbed } = require("discord.js");
const { status } = require("../../utils/distube.js");

module.exports = {
    name: "volume",
    category: "music",
    aliases: [ "v" ],
    description: "Set Volume",
    args: true,
    usage: "<Number of volume between 0 - 100>",
    permission: [],
    owner: false,
    inVoiceChannel: true,
    sameVoiceChannel: true,
    execute(message, args) {
        const queue = message.client.distube.getQueue(message);

        if(!queue) {
            let thing = new MessageEmbed()
                .setColor("RED")
                .setDescription(`❌ There is no music playing.`);
            return message.channel.send(thing);
        }

        let volume = parseInt(args[0])

        if (isNaN(volume)) {
            let thing = new MessageEmbed()
                .setColor("RED")
                .setDescription(`❌ Please enter a valid number!`);
            return message.channel.send(thing);
        }

        const volumenow = queue.volume;

        if (volume < 0)  volume = 0;
        if (volume > 100) volume = 100;
        
        message.client.distube.setVolume(message, volume);

        let thing = new MessageEmbed()
            .setColor(message.client.color)
            .setAuthor(message.client.user.username, message.client.user.displayAvatarURL())
            .setDescription(`🔊 **Volume** set to \`${volume}\``)
            .setFooter(status(message.author.tag, queue), message.author.displayAvatarURL());
        message.channel.send(thing);
    }
}