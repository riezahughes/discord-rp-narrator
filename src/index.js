require('dotenv').config()

const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log("READY");
});

client.on('message', (msg) => {
    
    if(msg.bot || msg.channel.type !== 'dm'){
        return;
    }

    client.channels.cache.get(process.env.CHANNEL).send("```"+msg.content+"```");

})

client.login(process.env.TOKEN);