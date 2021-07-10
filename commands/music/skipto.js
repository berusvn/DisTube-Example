const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "skipto",
    category: "music",
    aliases: [ "jump" ],
    description: "Skip Music",
    args: false,
    usage: "",
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

        if (isNaN(args[0])) {
            let thing = new MessageEmbed()
                .setColor("RED")
                .setDescription(`❌ Please enter a valid number!`);
            return message.channel.send(thing);
        }

        message.client.distube.jump(message, parseInt(args[0]))
            .catch(err => {
                let thing = new MessageEmbed()
                    .setColor("RED")
                    .setDescription(`❌ Please enter a valid number!`);
                return message.channel.send(thing);
            });
    }
}