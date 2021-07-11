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
    inVoiceChannel: true,
    sameVoiceChannel: false,
    execute(message, args) {

        const clientVoice = message.guild.me.voice;
        const memberVoice = message.member.voice;

        if (!clientVoice) {
            memberVoice.channel.join();

            let thing = new MessageEmbed()
                .setColor(message.client.color)
                .setAuthor(message.client.user.username, message.client.user.displayAvatarURL())
                .setDescription(`**Join** the voice channel.`)
                .setFooter(`Request by: ${message.author.tag}`, message.author.displayAvatarURL());
            return message.channel.send(thing);
        } else if (clientVoice && clientVoice !== memberVoice) {
            let thing = new MessageEmbed()
                .setColor("RED")
                .setDescription(`❌ You must be in the same channel as ${message.client.user}`);
            return message.channel.send(thing)
        } else if (clientVoice && clientVoice === memberVoice) {
            let thing = new MessageEmbed()
                .setColor("RED")
                .setDescription(`❌ I'm already on your voice channel`);
            return message.channel.send(thing)
        }
    }
}