//Dotenv
import dotenv from "dotenv";
dotenv.config();

//For Heroku
const PORT = process.env.PORT || 5000;
import http from "http";
 
//Discord
import { Client } from "discord.js";
const client = new Client();

//Users
import { users } from "./users.js";

//Commands
const commands = {
    "!golv-help": "Get golv",
    "!golv": "Gets a floor gif",
    "!tak": "Gets a roof gif",
    "": ""
};

const floorTriggers = ["sämst", "dålig", "kass", "sist", "suger"];

/*----- Bot begin -----*/

//Login
client.login(process.env.CLIENT_SECERECT);

//On message
client.on("message", message => {
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


    //TODO - fix
    if(messageArray.includes("!golv-help")) {
        //TODO - Add help message
    }

    //TODO - fix
    if(messageArray.includes("!tak")) {
         //TODO - Add roof message
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