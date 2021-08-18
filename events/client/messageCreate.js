const { MessageEmbed } = require("discord.js");

module.exports = async (client, message) => {
    if (message.author.bot) return;
    if (!message.guild) return;

    const PREFIX = client.prefix;
    const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    if (message.content.match(new RegExp(`^<@!?${message.client.user.id}>( |)$`))) {
        const embed = new MessageEmbed()
            .setColor(message.client.color)
            .setDescription(`Hello **${message.author.tag}**, my prefix is **${PREFIX}**.\nUse **${PREFIX}help** to get the list of the commands!`);
        return message.channel.send({ embeds: [embed] });
    }

    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(PREFIX)})\\s*`);
    if (!prefixRegex.test(message.content)) return;

    const [ matchedPrefix ] = message.content.match(prefixRegex);

    const args = message.content.slice(matchedPrefix.length).trim().split(/ +/g);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName) ||
        client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;

    const embed = new MessageEmbed()
        .setColor("RED");

    // args: true,
    if (command.args && !args.length) {
        let reply = `You didn't provide any arguments, ${message.author}!`;
        
        // usage: '',
        if (command.usage) {
            reply += `\nExamples: \`${PREFIX}${command.name} ${command.usage}\``;
        }
        
        embed.setDescription(reply);
        return message.channel.send({ embeds: [embed] });
    }

    if (command.permission && !message.member.permissions.has(command.permission)) {
        embed.setDescription("You can't use this command.");
        return message.channel.send({ embeds: [embed] });
    }

    if (command.owner && message.author.id !== message.client.owner) {
        embed.setDescription(`Only <@${message.client.owner}> can use this command.`);
        return message.channel.send({ embeds: [embed] });
    }

    if (command.memberVC && !message.member.voice.channel) {
        embed.setDescription(`${message.client.emoji.warn} You must be in a voice channel!`);
        return message.channel.send({ embeds: [embed] });
    }

    if (command.clientVC && !message.guild.me.voice.channel) {
        embed.setDescription(`${message.client.emoji.warn} I'm not on any voice channel!`);
        return message.channel.send({ embeds: [embed] });
    }

    if (command.sameVC && message.member.voice.channel !== message.guild.me.voice.channel) {
        embed.setDescription(`${message.client.emoji.warn} You must be in the same channel as ${message.client.user}!`);
        return message.channel.send({ embeds: [embed] });
    }

    if (command.queueVC && !message.client.distube.getQueue(message)) {
        embed.setDescription(`${message.client.emoji.warn} There is no music playing.`);
        return message.channel.send({ embeds: [embed] });
    }

    try {
        command.execute(message, args);
    } catch (error) {
        console.log(error);
        embed.setDescription(`${message.client.emoji.warn} There was an error executing that command.\nI have contacted the owner of the bot to fix it immediately.`);
        message.channel.send({ embeds: [embed] });
        let owner = message.client.users.cache.get(client.owner);
        owner.send({ content: `${message.client.emoji.warn} There was an error executing command **${command.name}**.\nAn error encountered: \n${error}\n<#${message.channel.id}>` });
    }
};