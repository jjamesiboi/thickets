
const { MessageEmbed } = require("discord.js");
const randomPuppy = require("random-puppy");
exports.run = async (bot, message, args, functions) => {

    const subReddits = ["dankmeme", "meme", "me_irl"];
    const random = subReddits[Math.floor(Math.random() * subReddits.length)];

    const img = await randomPuppy(random);
    const embed = new MessageEmbed()
        .setColor("RANDOM")
        .setImage(img)
        .setTitle("meme!")
        .setURL(`https://reddit.com/r/${random}`);

    message.channel.send(embed);
}

    exports.help = {
        name: "meme",
        aliases: ['memerandom', "randommeme", "random-puppy", "randompuppy"]
    }