require('dotenv').config();

//For Heroku
//TODO: Test if the port varible only needed
const PORT = process.env.PORT || 5000;
const http = require("http");
 
//Discord
const Discord = require("discord.js");
const client = new Discord.Client();

//Commands
const commands = {
    "!golv-help": "Get golv",
    "!golv": "Gets a floor gif",
    "!tak": "Gets a roof gif",
    "": ""
};

//Nicknames
const nicknames = [
{
    Name: ["lantz", "jojo"],
    Id:  "<@242377088391315457>",
},
{
  Name: ["hassel", "tönt"],
  Id: "<@109946837850419200>"
},
{
    Name: ["jeppe", "måsen"],
    Id: "<@109939339575717888>"
},
{
    Name: ["vera", "loremaster"],
    Id:  "<@125277055066701824>"
},
{
    Name: ["lukas", "volvopojken"],
    Id:  "<@109442142849486848>"
},
{
    Name: ["tim", "kuken"],
    Id:  "<@110048899804184576>"
},
{
    Name: ["c"],
    Id:  "<@146693111358160898>"
},
{
    Name: ["andre", "simp"],
    Id:  "<@110494198699945984>"
}];

const floorTriggers = ["sämst", "dålig", "kass", "sist", "suger"];

/*----- Bot begin -----*/

//Login
client.login(process.env.CLIENT_SECERECT);

//TODO - Grab all user Ids
client.once("ready", () => {
    console.log(client.users.cache)
});

//On message
client.on("message", message => {
    const messageArray = message.content.toLowerCase().split(/ +/);

    //Check if message contains loser & tags user as a 
    if(messageArray.some(word => floorTriggers.includes(word) && messageArray.length > 1)) {
        const userToMention = nicknames.find(nickname => messageArray.find(msg => nickname.Name.includes(msg)));

        if(userToMention.Name.includes("lantz")) {
            return message.channel.send(`Bra försök <@${message.author.id}>! Lantz lägger tak!`);
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