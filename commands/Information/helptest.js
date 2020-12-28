const { MessageEmbed } = require("discord.js");

exports.run = async (bot, message, args, functions) => {
    const embed = new MessageEmbed()
        .setAuthor("Commands")
        .setDescription(`Total Commands: ${bot.commands.size}`)
        .setColor("BLURPLE")
        .setTimestamp()
        .setThumbnail(bot.user.displayAvatarURL)
        .setFooter(message.author.tag, message.author.displayAvatarURL);
    bot.commands.forEach(cmd => {
        embed.addField(`${cmd.help.name}`, `Aliases: ${cmd.help.aliases.join(", ") || "None"}\n`, false);
    });
    return message.channel.send(embed);
}


exports.help = {
    name: "dawdawdawdawdawd",
    aliases: ["hdawdawdawd"]

}
