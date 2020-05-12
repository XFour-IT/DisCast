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
                  const playingEmbed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle('Now Playing')
                    .setURL('https://utcr.live/')
                    .setAuthor('UTCR.Live', 'https://utcr.live/lib/res/favicon/apple-touch-icon.png', 'https://utcr.live/')
                    .setDescription(JSON.parse(data).data[0].track.title)
                    .setThumbnail(JSON.parse(data).data[0].track.imageurl)
                    .addFields(
                        { name: 'Author', value: JSON.parse(data).data[0].track.artist }
                    )
                    .setTimestamp()
                    .setFooter('Tune in at UTCR.Live');
                  client.channels.cache.get(config.channel).send(playingEmbed)
              };
          });
        
        }).on("error", (err) => {
          console.log("Error: " + err.message);
    })
}

setInterval(getSong, 5000)

client.login(config.token)