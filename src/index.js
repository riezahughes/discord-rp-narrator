require('dotenv').config()

const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log("READY");
    client.api.applications(client.user.id).guilds(process.env.GUILD).commands.post({
        data: {
            name: "Narration",
            description: "Ask the narrator to post in the channel as an inbetween for RP",
            options: [
                {
                    name: "Post",
                    description: "Write what you wish to narrate",
                    type: 3,
                    required: true,
                }
                
            ]
            // possible options here e.g. options: [{...}]
        }
    });


    client.ws.on('INTERACTION_CREATE', async interaction => {
        const command = interaction.data.name.toLowerCase();
        const args = interaction.data.options;
        console.log(args);
        console.log(args.value);
        if (command === 'narration'){   

            const discordResponse = "```"+args[0].value+"```"

            // here you could do anything. in this sample
            // i reply with an api interaction
            client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4,
                    data: {
                        content: discordResponse
                    }
                }
            })
        }
    });
});

client.login(process.env.TOKEN);