//Dotenv
import dotenv from "dotenv";
dotenv.config();

//For Heroku
const PORT = process.env.PORT || 5000;
import http from "http";



//Discord
import { Client } from "discord.js";
const client = new Client();

//Music
import ytdl from 'ytdl-core';

//Users
import { users } from "./users.js";

//Commands
const commands = {
    "!golv-help": "Gets a golv.",
    "!gp <youtube url>": "Plays a youtube url.",
    "!gps": "Stops current song.", 
    "!golv": "Gets a floor gif.",
    "!tak": "Bruh..."
};

const floorTriggers = ["sämst", "dålig", "kass", "sist", "suger"];

/*----- Bot begin -----*/

//Login
client.login(process.env.CLIENT_SECERECT);

//Set status
client.once("ready", () => {
	client.user.setPresence({ activity: { name: "!golv-help" }, status: "online" });
});

//On message
client.on("message", async message => {
    const messageArray = message.content.toLowerCase().split(/ +/);

    //Check if message contains loser & tags user as a 
    if(messageArray.some(word => floorTriggers.includes(word) && messageArray.length > 1)) {
        const userToMention = users.find(user => messageArray.find(msg => user.Name.includes(msg)));

        if(userToMention.Name.includes("lantz")) {
            return message.channel.send(`Bra försök <@${message.author.id}>! Men Lantz lägger tak!`);
        } else if(userToMention !== "undefined") {
            message.react("768160415150112797");
            return message.channel.send(`${userToMention.Id} lägger golv!`);
        }
    }

    //Help command
    if(messageArray.includes("!golv-help")) {
        let helpmsg = "";
        for(const cmd in commands){
            helpmsg += cmd + ": " + commands[cmd] + "\n";
        }

        return message.channel.send(helpmsg);
    }

    //Play music
    if(messageArray.includes("!gp")) {
        const youtubeUrl = message.content.split(/ +/);
        const url = youtubeUrl.find(msg => msg.includes("https"));

        if(url !== "undefiend") {
           message.member.voice.channel.join().then(connection => {
                const stream = ytdl(url, { filter: "audioonly", quality: "lowest" })
                const dispatcher = connection.play(stream);
                
                dispatcher.on("finish", () => message.member.voice.channel.leave());
            });
        }
    }

    //TODO - fix
    //Stop music
    if(messageArray.includes("!gps")) {

    }

    //TODO - fix
    if(messageArray.includes("!tak")) {
        message.member.voice.channel.join().then(connection => {
            const stream = ytdl('https://www.youtube.com/watch?v=YEc7tOytuxk', { filter: "audioonly", quality: "lowest" })
            const dispatcher = connection.play(stream);
            
            dispatcher.on('finish', () => message.member.voice.channel.leave());
        })
    }

    //TODO - fix
    if(messageArray.includes("!golv")) {
        message.react("768160415150112797");
        message.channel.send("", {files: ["https://media1.tenor.com/images/2eb0cad8576bab400181013595e90bbd/tenor.gif?itemid=4756231"]});
    }

    if(messageArray.includes("<:golvleggaren:768160415150112797>")) {
        message.react("768160415150112797");
        message.channel.send("Jag lägger golv!");
    }
});