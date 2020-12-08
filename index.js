require('dotenv').config();

//For Heroku
//TODO: Test if the port varible only needed
const PORT = process.env.PORT || 5000;
const http = require("http");
 
//Discord
const Discord = require("discord.js");
const client = new Discord.Client();
const prefix = "!";

//Commands
const commands = {
    "!golv-help": "Get golv",
    "!golv": "Gets a floor gif",
    "!tak": "Gets a roof gif",
    "": ""
};

//Nicknames
//TODO - Add all user Ids
const nickNames = {
    "lantz": "<@242377088391315457>",
    "hassel": "<@109946837850419200>",
    "jeppe": "<@109939339575717888>",
    "vera": "<@125277055066701824>",
    "c": "<@>",
    "lukas": "<@>",
    "tim": "<@>",
    "andre": "<@>"
};

const floorTriggers = ["sämst", "dålig", "kass", "sist"];

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
    floorTriggers.forEach(word =>{
        if(messageArray.includes(word)){
            for(const key in nickNames){
                if(messageArray.includes(key)){
                    message.react("768160415150112797");
                    return message.channel.send(`${nickNames[key]} lägger golv!`);
                }
            }
        }
    });

    //TODO - fix
    if(messageArray.includes("golv-help")) {
        //TODO - Add help message
    }

    //TODO - fix
    if(messageArray.includes("tak")) {
         //TODO - Add roof message
    }

    //TODO - fix
    if(messageArray.includes("golv")) {
        message.react("768160415150112797");
        message.channel.send("", {files: ["https://media1.tenor.com/images/2eb0cad8576bab400181013595e90bbd/tenor.gif?itemid=4756231"]});
    }

    //TODO - fix
    if(messageArray.includes("<:Golvleggaren:768160415150112797>")) {
        message.react("768160415150112797");
        message.channel.send("Jag lägger golv!");
    }
});


/* KEEP ALIVE */
http.createServer(function (request, response) {}).listen(PORT);

const startKeepAlive = () => {
    setInterval(function() {
        console.log("Keep alive");
    }, 20 * 60 * 1000); // load every 20 minutes
}

startKeepAlive();