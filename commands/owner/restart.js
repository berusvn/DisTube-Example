const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "restart",
    category: "owner",
    aliases: [],
    description: "",
    args: false,
    usage: "<Code>",
    permission: [],
    owner: true,
    async execute(message, args) {
        
        const embed = new MessageEmbed()
            .setColor("BLACK")
            .setDescription(`Restarting bot.`);
        message.channel.send({ embeds: [embed] }).then(message => {
            process.exit();
        });
		
    }
}