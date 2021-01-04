const Discord = require('discord.js');
const functions = require("../functions/functions.js");
const dateFormat = require('dateformat');
const db = require('quick.db');
const fs = require('fs');
const color = JSON.parse(fs.readFileSync(`Storage/color.json`, `utf8`));

module.exports = async (bot, reaction, user) => {
  if(reaction.message.partial) await reaction.message.fetch();
  if(reaction.partial) await reaction.fetch();

  let message = reaction.message;
  if(!message) return;
  if(user.bot) return;

  let logsChannel = message.guild.channels.cache.find(c => c.id === db.get(`logs_${message.guild.id}`));

  let already = new Discord.MessageEmbed()
  .setColor(color.red)
  .setAuthor(`⛔ | No.`)
  .setDescription(`You can only have one ticket open at a time.`);

  let success = new Discord.MessageEmbed()
  .setColor(color.green)
  .setTitle(`🎟️ | Ticket System`)
  .setDescription(`Please explain the reason for your request. A member of the team will take care of your ticket shortly. Note: The maker of the ticket can not close it. This is to prevent spam.`);

  let split = '';
  let usr = user.id.split(split);
  for (var i = 0; i < usr.length; i++) usr[i] = usr[i].trim();

  if(message.embeds.length === 1 && message.embeds[0].title === 'Ticket System' && message.embeds[0].description === 'React with 🎟️ to create a ticket.'){
    if(reaction.emoji.name === "🎟️"){
      if(!message.guild.channels.cache.find(c => c.name === `ticket-${usr[0]}${usr[1]}${usr[2]}${usr[3]}`)){

        let role = message.guild.roles.cache.find(r => r.name === "Ticket Support");
        if(!role) {
          message.guild.roles.create({data:{name: "Ticket Support", permissions: 0}, reason: 'Staff for tickets'});
          message.channel.send(`Please react to the ticket creation message again.
          `).then(m => m.delete({timeout: 5000}).catch(e => {}));
          reaction.users.remove(user.id);
          return
        }
        let categoria = message.guild.channels.cache.find(c => c.name == "tickets" && c.type == "category");
        if(!categoria) categoria = await message.guild.channels.create("tickets", {type: "category", position: 1}).catch(e => {return functions.errorEmbed(message, message.channel, "Une erreur a été rencontrée.")});

        let permsToHave = ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY', 'ADD_REACTIONS']

        message.guild.channels.create(`ticket-${usr[0]}${usr[1]}${usr[2]}${usr[3]}`, { permissionOverwrites:[
          {
            deny: 'VIEW_CHANNEL',
            id: message.guild.id
          },
          {
            allow: permsToHave,
            id: user.id
          },
          {
            allow: permsToHave,
            id: role.id
          },
        ],
        parent: categoria.id,
        reason: `This user needs help.`,
        topic: `**ID:** ${user.id} -- **Tag:** ${user.tag} | s!close`
      }).then(channel => {

        let createdEmbed = new Discord.MessageEmbed()
        .setAuthor(`📝 | Open Ticket`)
        .setTimestamp()
        .setColor(color.none)
        
        .setFooter(`Ticket System`, bot.user.displayAvatarURL())
        .setDescription(`A user has opened a ticket and is waiting for their request to be processed .`)
        .addField(`Information`, `**User :** \`${user.tag}\`\n**ID :** \`${user.id}\`\n**Ticket :** ${channel}\n**Date :** \`${dateFormat(new Date(), "dd/mm/yyyy - HH:MM:ss")}\``);

        if(logsChannel) logsChannel.send(createdEmbed);
        channel.send(`${user}`, {embed: success});
        db.set(`ticket.ticket-${usr[0]}${usr[1]}${usr[2]}${usr[3]}`, { user: user.id });
      })
      reaction.users.remove(user.id);
      return;
    } else {
      reaction.users.remove(user.id);
      message.reply({embed: already}).then(m => m.delete({timeout: 5000}).catch(e => {}));
    }
    } else {
      reaction.users.remove(user.id);
    }
  }

  // ========================= //

  if(message.embeds.length === 1 && message.embeds[0].title === '🎟️ | Ticket Completed' && message.embeds[0].description === `
  React with \\ 🗑️ to close the ticket, or don't react if you have other requests.`){
    if(reaction.emoji.name === "🗑️"){
      if(user.id === db.get(`ticket.${message.channel.name}.user`)){

        let deletedEmbed = new Discord.MessageEmbed()
        .setAuthor(`🗑️ | Ticket Closed`)
        .setColor(color.none)
        .setDescription(`The author has confirmed that the ticket has been closed.`)
        .setTimestamp()
        .setFooter(`Ticket System`, bot.user.displayAvatarURL())
        .addField(`Information`, `**User :** \`${user.tag}\`\n**ID :** \`${user.id}\`\n**Ticket :** \`${message.channel.name}\`\n**Date :** \`${dateFormat(new Date(), "dd/mm/yyyy - HH:MM:ss")}\``);

        if(logsChannel) logsChannel.send(deletedEmbed);

        message.channel.delete();

      }
    }
  }

}
