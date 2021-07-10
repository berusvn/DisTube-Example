/**
 * Module Imports
 */
const { Client, Collection, Intents } = require("discord.js");
const { readdirSync } = require("fs");
const { TOKEN, PREFIX, OWNERID, EMBEDCOLOR, youtubeCookie, youtubeIdentityToken } = require("./config.json");
const DisTube = require('distube');

const client = new Client({
    disableMentions: "everyone",
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
    ws: { intents: Intents.ALL }
});

const distube = new DisTube(client, { 
    searchSongs: false, 
    emitNewSongOnly: false, 
    leaveOnStop: false, 
    leaveOnEmpty: false,
    leaveOnFinish: false,
    youtubeCookie: youtubeCookie,
    youtubeIdentityToken: youtubeIdentityToken
});

client.prefix = PREFIX;
client.owner = OWNERID;
client.commands = new Collection();
client.categories = readdirSync("./commands/");
client.distube = distube;
client.color = EMBEDCOLOR;

/**
 * Client Events
 */
readdirSync("./events/client/").forEach(file => {
    const event = require(`./events/client/${file}`);
    let eventName = file.split(".")[0];
    client.logger.log(`Loading Events Client ${eventName}`, "event");
    client.on(eventName, event.bind(null, client));
});

/**
 * Distube Events
 */
readdirSync("./events/distube/").forEach(file => {
    const event = require(`./events/distube/${file}`);
    let eventName = file.split(".")[0];
    client.logger.log(`Loading Events Lavalink ${eventName}`, "event");
    client.distube.on(eventName, event.bind(null, client));
});

/**
 * Import all commands
 */
readdirSync("./commands/").forEach(dir => {
    const commandFiles = readdirSync(`./commands/${dir}/`).filter(f => f.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${dir}/${file}`);
        console.log(`Loading ${command.category} commands ${command.name}`);
        client.commands.set(command.name, command);
    }
});

/**
 * Error Handler
 */
client.on("disconnect", () => console.log("Bot is disconnecting..."))
client.on("reconnecting", () => console.log("Bot reconnecting..."))
client.on('warn', error => console.log(error));
client.on('error', error => console.log(error));
process.on('unhandledRejection', error => console.log(error));
process.on('uncaughtException', error => console.log(error));

client.login(TOKEN);