require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = "!";

client.login(process.env.CLIENT_SECERECT);

client.on("message", message => {

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    
    const user = getUserFromMention(message.content);



    if(command === "golv"){
        message.react("768160415150112797");
        message.channel.send("", {files: ["https://media1.tenor.com/images/2eb0cad8576bab400181013595e90bbd/tenor.gif?itemid=4756231"]})
    }

    if(message.content.indexOf("<:Golvleggaren:768160415150112797>") !== -1) {
        message.react("768160415150112797");
        message.channel.send("Jag lägger golv!");
    }
});

function getUserFromMention(mention) {
	if (!mention) return;

	if (mention.startsWith('<@') && mention.endsWith('>')) {
		mention = mention.slice(2, -1);

		if (mention.startsWith('!')) {
			mention = mention.slice(1);
		}

		return client.users.cache.get(mention);
	}
}