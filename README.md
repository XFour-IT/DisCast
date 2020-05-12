# DisCast

DisCast is a Node.JS implementation of a now playing Discord bot. It retrieves the metadata from a shoutcast server at a defined interval and posts the details in a formatted embed to a specified discord channel. 

## Setup 

1. Signup for a Discord Bot Token at: [http://discordapp.com/developers/applications/me]
2. Copy config.json.example to config.json
3. Fill in the form with your bot token and URL of ShoutCast Stream Details widget (JSON) 
4. Enable developer mode in Discord
5. Copy channel ID into config.json under channel

## Changing scan interval

Change the second parameter of the setInterval statement at line 34. This is measured in milliseconds. 
(In a future release, this will be a config parameter)