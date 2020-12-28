const Discord = require("discord.js");
exports.run = async (bot, message, args, functions) => {
    const repoEmbed = new Discord.MessageEmbed()
    .setDescription("Bot Owner")
    .setColor("#00FF00")
    .addField("Github", "https://www.github.com/codeswithjames/")
 

    return message.channel.send(repoEmbed);
}

    exports.help = {
        name: "code",
        aliases: ['github', "repo", "repository", "githubproject", "code"]
    }