const { MessageEmbed } = require("discord.js");
const { status } = require("../../utils/distube.js");

module.exports = {
    name: "queue",
    category: "music",
    aliases: [ "q" ],
    description: "Queue Music",
    args: false,
    usage: "",
    permission: [],
    owner: false,
    memberVC: false,
    clientVC: false,
    sameVC: false,
    queueVC: true,
    async execute(message, args) {
        const queue = message.client.distube.getQueue(message);

        function paginate(arr, size) {
            return arr.reduce((acc, val, i) => {
                let idx = Math.floor(i / size)
                let page = acc[idx] || (acc[idx] = [])
                page.push(val)
                return acc
            }, [])
        }

        let array = queue.songs.map((song, id) => `**${id + 1}**. [${song.name}](${song.url}) - \`${song.formattedDuration}\``);
        let page_size = 10;
        let pages = paginate(array, page_size);
        let current = 0;

        let embed = new MessageEmbed()
            .setColor("BLACK")
            .setFooter(`Request by ${message.author.tag} • ${status(queue)}`, message.author.displayAvatarURL())
            .setDescription('Loading queue pages...');

        let m = await message.channel.send({ embeds: [embed] });

        function reactionsNeeded(page) {
            return [
                pages[page - 1],
                pages[page + 1]
            ];
        }

        function createEmbed (page) {
            let embed = new MessageEmbed()
                .setColor("BLACK")
                .setFooter(`Request by ${message.author.tag} • ${status(queue)}`, message.author.displayAvatarURL())
                .setDescription(`${message.client.emoji.queue} Queue:\n` + pages[page].join('\n') + `\n\nPage ${page + 1} of ${pages.length}`);
            return embed;
        }
        
        async function showPage (page) {
            let output = createEmbed(page);
            await m.edit({ embeds: [output] });
            await m.reactions.removeAll();
            let needed = reactionsNeeded(page);
            let left, right;
            if (needed[0]) {
                await m.react('⬅️');
                let filter = (r, u) => r.emoji.name == '⬅️' && u.id == message.author.id;
                left = m.createReactionCollector({ filter, time: 60000 });
                left.on('collect', r => {
                    if (right) right.stop();
                    left.stop();
                    showPage(current - 1);
                    current = current - 1;
                });
				left.on('end', collected => {
					setTimeout(() => { m.delete() }, 120000);
				});
            } else if (needed[1]) {
                await m.react('➡️');
                let filter = (r, u) => r.emoji.name == '➡️' && u.id == message.author.id;
                right = m.createReactionCollector({ filter, time: 60000 });
                right.on('collect', r => {
                    if (left) left.stop();
                    right.stop();
                    showPage(current + 1);
                    current = current + 1;
                });
				right.on('end', collected => {
					setTimeout(() => { m.delete() }, 120000);
				});
            }
        }

        showPage(current);
    }
}