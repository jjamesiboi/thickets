const Discord = require("discord.js");
const fs = require("fs");
const color = JSON.parse(fs.readFileSync(`Storage/color.json`, `utf8`));

exports.run = async (bot, message) => {
  const m = await message.channel.send("Pinging..."); // Make sure the async is written, top of the client.on("message", ...)
  const embed = new Discord.MessageEmbed()
  .setColor("RANDOM") // Tired of choosing the embed colors? Just type "RANDOM" on it!
  .addField("⌛ Latency", `**${m.createdTimestamp -  message.createdTimestamp}ms**`)
  .addField("💓 API", `**${Math.floor(bot.ws.ping)}ms**`) // Use "client.ping" if your Discord.js is < 1.15.1 --- Use "client.ws.ping" if your Discord.js is > 12.0.0
  return m.edit(`🏓 Pong! 🏓`, embed);

}

exports.help = {
    name: "ping",
    aliases: ['pong', "p"]
}