const { MessageEmbed } = require("discord.js");

module.exports = async (client, channel, err) => {

    console.log(err);

    let thing = new MessageEmbed()
        .setColor("RED")
        .setDescription(`${client.emoji.warn} An error encountered: \n${err}`);
    channel.send({ embeds: [thing] });

    let owner = client.users.cache.get(client.owner);
    owner.send({ content: `${client.emoji.warn} An error encountered: \n${err}\n<#${channel.id}>` });

}