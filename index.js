const https = require('https');
const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('/config.json')

var playing
client.login(config.token)

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

function getSong(scURL) {
    https.get(scURL, (res) => {
        let data = '';

        res.on('data', (chunk) => {
            data += chunk;
          });
        
          // The whole response has been received. Print out the result.
          res.on('end', () => {
              console.log(JSON.parse(data).data[0].song);
              if (playing != JSON.parse(data).data[0].song) {
                  playing = playing = JSON.parse(data).data[0].song;
                  postDiscord(playing);
              };
          });
        
        }).on("error", (err) => {
          console.log("Error: " + err.message);
    })
}

getSong('https://cressida.shoutca.st/rpc/utcr/streaminfo.get')