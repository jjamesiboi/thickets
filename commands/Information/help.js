const Discord = require("discord.js");
const fs = require("fs");
const color = JSON.parse(fs.readFileSync(`Storage/color.json`, `utf8`));

exports.run = async (bot, message, args, functions) => {
  console.log("Someone used command:  Help!");
  let emb = new Discord.MessageEmbed()
    .setTitle(`Help Menu`)
    .setColor(color.none)
    .setDescription(`All commands!`)
    .addField(`Information Commands`, "2 Commands", true)
    .addField(`t.ping`, `Shows latency and stuff!`, false)
    .addField(`t.invite`, `Invite the bot!`, false)
    .addField(`t.code`, `Github of bot owner!`, false)
    .addField(`t.stats`, `Shows bot stats!`, false)
    .addField(`t.help`, `Current Command!`, false)
    .addField(`Vouching Commands`, "2 Commands", true)
    .addField(`t.vouch`, `Vouch a user!`, false)
    .addField(`t.myvouchs`, `Shows your vouchs!`, false)
    .addField(`Utilities Commands`, "2 Commands", true)
    .addField(`t.close`, `Closes a ticket.`, false)
    .addField(`t.ticket`, `Set up ticket reaction message!`, false)
    .addField(`Administration and Setup Commands`, "1 Command", true)
    .addField(`t.setlogs`, `Set ticket log channel. (recommended)`, false)
    .addField(`Fun Commands`, "2 Commands", true)
    .addField(`t.meme`, `Get a random meme!`, false)
    .addField(`t.joke`, `Get a random joke!`, false)
    .addField(`t.discordjs`, `Get info about documentation of discord.js!`, false)

    .setFooter("Powered by: Jamesiboi#0001!", "");

  message.author.send(`These are my commands! If a command isnt working please conact developers using t.contact`, emb);
  message.channel.send("Check your dms :D!");
};

exports.help = {
  name: "help",
  aliases: ["commands", "h", "commands", "commandlist"],
};
