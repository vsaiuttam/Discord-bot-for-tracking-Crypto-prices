const Discord = require('discord.js');
const axios = require('axios');

const client = new Discord.Client();

const PREFIX = '!';

client.on('message', async message => {
    if (message.author.bot) return;
    if (!message.content.startsWith(PREFIX)) return;

    const args = message.content.slice(PREFIX.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'price') {
        if (!args.length) {
            return message.channel.send("Please specify a cryptocurrency!");
        }

        const crypto = args[0].toLowerCase();
        try {
            const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${crypto}&vs_currencies=usd`);
            const price = response.data[crypto].usd;
            message.channel.send(`Current price of ${crypto.toUpperCase()}: $${price}`);
        } catch (error) {
            console.error('Error fetching price:', error);
            message.channel.send(`Error fetching price for ${crypto.toUpperCase()}. Please make sure the cryptocurrency is valid.`);
        }
    }
});

client.login('YOUR_DISCORD_BOT_TOKEN');
