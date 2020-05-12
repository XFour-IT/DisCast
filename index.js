const https = require('https');
const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json')

var playing

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

function getSong() {
    https.get(config.url, (res) => {
        let data = '';

        res.on('data', (chunk) => {
            data += chunk;
          });
        
          // The whole response has been received. Print out the result.
          res.on('end', () => {
              if (playing != JSON.parse(data).data[0].song) {
                  playing = JSON.parse(data).data[0].song;
                  console.log(playing)
                  client.channels.cache.get(config.channel).send("Now playing on UTCR.Live: " + playing)
              };
          });
        
        }).on("error", (err) => {
          console.log("Error: " + err.message);
    })
}

setInterval(getSong, 5000)

client.login(config.token)