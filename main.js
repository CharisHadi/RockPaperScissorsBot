const Discord = require('discord.js');
const config = require('./config.json');

const client = new Discord.Client();

const prefix = '!';

const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

//Log that rock paper scissors goes online in console
client.once('ready', ()=>{
    console.log('RockPaperScissors is Online');
})

//test handler bot on
client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'ping'){
            client.commands.get('ping').execute(message, args);
    }
});

//logs bot into discord server
client.login(config.token);