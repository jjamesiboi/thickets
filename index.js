const Discord = require("discord.js"); //installing discord.js module and requiring it
const config = require("./Storage/config.json"); // config files
const db = require("quick.db");

const bot = new Discord.Client({
  disableEveryone: true,
  autoReconnect: true,
  disabledEvents: ["TYPING_START"],
  partials: ["MESSAGE", "CHANNEL", "GUILD_MEMBER", "REACTION"],
});


bot.on("message", async (message) => {
  if (
    message.mentions.has(bot.user) &&
    !message.mentions.has(message.guild.id)
  ) {
    let embed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setTitle("Use t.help for all commands!")
      .setURL("https://www.thisworldthesedays.com/ssdasdsadasds.html")
      .setFooter("Powered by: Jamesiboi#0001!");
    return message.channel.send(embed);
  }
});
  bot.commands = new Discord.Collection();
  bot.aliases = new Discord.Collection();
  bot.event = new Discord.Collection();


  const loadCommands = require("./functions/commands.js");
  const loadEvents = require("./functions/events.js");

  const load = async () => {
    await loadCommands.run(bot);
    await loadEvents.run(bot);
  };

  load(); // load commands :D
  bot.login('Nzg1ODQxMTM4MDI3NDYyNjY2.X89tlw.sbZrpoVOWboiJE425PwtapIu7JM');
