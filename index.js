
require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = "!";

client.login(process.env.CLIENT_SECERECT);

client.on("message", message => {

    const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

    if(command === "golv"){
        message.react("768160415150112797");
        message.channel.send("Jag lägger golv!");
    }

    if(message.content.indexOf("<:Golvleggaren:768160415150112797>") !== -1) {
        message.react("768160415150112797");
        message.channel.send("Jag lägger golv!");
    }
});