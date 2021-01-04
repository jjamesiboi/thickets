const { MessageEmbed } = require("discord.js");

module.exports = {
    config: {
        name: "credits",
        aliases: [''],
        category: 'info',
        description: 'Shows credits',
        usage: '',
        accessableby: 'everyone'
    },
    run: async (bot, message, args) => {
            const embed = new MessageEmbed()
                .setTitle(`NoiceBot Credits`)
                .setColor("GREEN")
                .setDescription(`**NoiceBot** is a bot created by james :p!`)
                .setFooter(message.guild.name, message.guild.iconURL())
            message.channel.send(embed)
    }
};
