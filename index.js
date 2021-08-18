/**
 * Module Imports
 */
const { Client, Collection, Intents } = require("discord.js");
const { readdirSync } = require("fs");
const { TOKEN, PREFIX, OWNERID, EMBEDCOLOR, youtubeCookie, youtubeIdentityToken, clientId, clientSecret, BENNY, musicimg } = require("./config.json");
const DisTube = require('distube');
const { SpotifyPlugin } = require("@distube/spotify");

const client = new Client({
    allowedMentions: { parse: ['users', 'roles'], repliedUser: true },
    partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'GUILD_MEMBER', 'USER'],
    intents: 32767
});

const distube = new DisTube.DisTube(client, {
	searchSongs: 0,
	searchCooldown: 30,
	leaveOnEmpty: true,
	emptyCooldown: 0,
	leaveOnFinish: false,
	leaveOnStop: false,
	plugins: [new SpotifyPlugin({ 
        parallel: true, 
        emitEventsAfterFetching: false,
        api: { 
            clientId: clientId, 
            clientSecret: clientSecret, 
        }
    })],
    youtubeCookie: youtubeCookie,
    youtubeIdentityToken: youtubeIdentityToken,
    ytdlOptions: {
        highWaterMark: 1 << 24,
        quality: 'highestaudio'
    },
    emitAddListWhenCreatingQueue: true,
    emitAddSongWhenCreatingQueue: false
});

client.prefix = PREFIX;
client.owner = OWNERID;
client.commands = new Collection();
client.categories = readdirSync("./commands/");
client.logger = require("./utils/logger.js");
client.distube = distube;
client.color = EMBEDCOLOR;
client.emoji = require("./utils/emoji.json");
client.musicimg = musicimg;

// Client Events
readdirSync("./events/client/").forEach(file => {
    const event = require(`./events/client/${file}`);
    let eventName = file.split(".")[0];
    client.logger.log(`Loading Events Client ${eventName}`, "event");
    client.on(eventName, event.bind(null, client));
});

// Distube Events
readdirSync("./events/distube/").forEach(file => {
    const event = require(`./events/distube/${file}`);
    let eventName = file.split(".")[0];
    client.logger.log(`Loading Events Distube ${eventName}`, "event");
    client.distube.on(eventName, event.bind(null, client));
});

// Import all commands
readdirSync("./commands/").forEach(dir => {
    const commandFiles = readdirSync(`./commands/${dir}/`).filter(f => f.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${dir}/${file}`);
        client.logger.log(`Loading ${command.category} commands ${command.name}`, "cmd");
        client.commands.set(command.name, command);
    }
});

// Error Handler
client.on('error', error => console.log(error));
client.on('warn', info => console.log(info));
process.on('unhandledRejection', error => console.log(error));
process.on('uncaughtException', error => console.log(error));

client.login(TOKEN);