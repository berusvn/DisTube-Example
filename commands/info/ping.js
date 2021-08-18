const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "ping",
    category: "info",
    aliases: [],
    description: "Check Ping Bot",
    args: false,
    usage: "",
    permission: [],
    owner: false,
    execute(message, args) {
        const embed = new MessageEmbed()
            .setColor(message.client.color)
            .setDescription(`Ping : **${message.client.ws.ping}**ms`);
        message.channel.send({ embeds: [embed] });
    }
}