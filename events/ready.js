const Discord = require("discord.js");

module.exports = async (bot) => {

    console.log("#################################");
    console.log("#################################");
    console.log("##       JamesDev#0001         ##");
    console.log("##       Thicket Development   ##");
    console.log("##           Online            ##");
    console.log("#################################");
    console.log("#################################");
    console.log('Im online master!')
  const activities_list = [
    `Ping for help`,
    `t.help | ${bot.users.cache.size} users`,
    `t.help | ${bot.guilds.cache.size} servers`
];
    setInterval(() => {
        const index = Math.floor(Math.random() * (activities_list.length - 1) + 1);
        bot.user.setActivity(activities_list[index]);
    }, 5000);
}
