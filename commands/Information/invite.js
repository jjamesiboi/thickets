
const Discord = require("discord.js");

exports.run = async (bot, message) => {
  const m = await message.channel.send("Finding invite link"); // Make sure the async is written, top of the client.on("message", ...)
  const embed = new Discord.MessageEmbed()
  .setColor("RANDOM") 
  .setTitle(`Click here to invite!`)
  .setURL(`https://discord.com/api/oauth2/authorize?client_id=785841138027462666&permissions=8&scope=bot`)
  return m.edit(` Invite link has been given!! `, embed);

}

exports.help = {
    name: "invite",
    aliases: ['add', "addbot"]
}