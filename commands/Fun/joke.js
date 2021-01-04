const { MessageEmbed } = require("discord.js");
const Random = require("srod-v2");
exports.run = async (bot, message, args, functions) => {

    let Joke = await Random.GetJoke("BLUE");
    message.channel.send(Joke);
}


    exports.help = {
        name: "joke",
        aliases: ['srod', "srodv2", "randomjoke", "jokerandom"]
    }