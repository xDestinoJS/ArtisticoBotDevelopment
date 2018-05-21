const availableCommands = require("./availableCommands.json");
const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const bot = new Discord.Client()
const superagent = require("superagent");
const botOwners = ("xDestino, _TimeTicks");


bot.on("ready", async () => {
  console.log("Everything has loaded succesfuly! ")
  bot.user.setStatus("Online")
  bot.user.setActivity("on PaintWars")
});

bot.on("guildMemberAdd", async member => {
  console.log(`${member.id} joined the server.`);

      let modlogsChannel = member.guild.channels.find(`name`, "mod-logs");
      let welcomechannel = member.guild.channels.find(`name`, "welcome-and-leave");

      let welcomeBotIcon = bot.user.displayAvatarURL;
      let welcomeEmbed = new Discord.RichEmbed()
      .setDescription("User joined")
      .setColor("#2ed0d3")
      .setThumbnail(welcomeBotIcon)
      .addField(`Username:`, `<@${member.id}>`);

      welcomechannel.send(`Welcome <@${member.id}> to PaintWars official Discord server!\nMake sure to read the #welcome-and-rules channel! :tada: :tada:` )
      modlogsChannel.send(welcomeEmbed)
});

bot.on("guildMemberRemove", async member => {
  console.log(`${member.id} left the server.`);

      let modlogsChannel = member.guild.channels.find(`name`, "mod-logs");
      let welcomechannel = member.guild.channels.find(`name`, "welcome-and-leave");

      let leaveBotIcon = member.displayAvatarURL;
      let leaveEmbed = new Discord.RichEmbed()
      .setDescription("User left")
      .setColor("#d11717")
      .setThumbnail(leaveBotIcon)
      .addField(`Username:`, `<@${member.id}>`);

      welcomechannel.send(`Welcome <@${member.id}> left PaintWars official Discord server :sob:` )
      modlogsChannel.send(leaveEmbed)
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if(cmd == `${prefix}artisticdevelopers`){

    let artisticdeveloperembed = new Discord.RichEmbed()

    .setDescription("Artistic Developers")
    .setColor("#5bceff")
    .addField("What is the Artistic Developer's team?", "It's a team dedicated to the creation of game's with 'Paint' ")
    .addField("Who are the creator's of the team?", "xDestino, TrollTeam1738")
    .addField("Discord server invite:", `https://discord.gg/E7jGwZx`)
    .setImage("https://i.imgur.com/pmwNmsj.png");

    message.channel.send(artisticdeveloperembed)
  }

  if(cmd == `${prefix}islandchaos`){

    let islandchaosembed = new Discord.RichEmbed()

    .setDescription("Island Chaos")
    .setColor("#f7c12e")
    .addField("What is Island Chaos?", "Its a game created by xDestino.")
    .addField("What do you play?", "Sorry, but do you really want spoilers?")
    .addField("Discord server invite:", `NOT YET!`)
    .setImage("https://i.imgur.com/pmwNmsj.png");

    message.channel.send(islandchaosembed)
  }

  if(cmd == `${prefix}say`){
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You can not use that command!");
    let botmessage = args.join(" ");
    if(!botmessage) return message.channel.send("What should I say?")
    message.delete().catch();
    message.channel.send(botmessage)
  }

  if(cmd == `${prefix}purge`){
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You do not have enough permission's to use that command.");
  if(!args[0]) return message.channel.send("How much messages should I delete for you?");
  message.channel.bulkDelete(args[0]).then(() => {
    message.channel.send(`Deleted ${args[0]} messages.`).then(msg => msg.delete(5500));
  })
}

  if(cmd == `${prefix}dice`){
    let replies = ["1", "2", "3", "4", "5", "6"];

    let result = Math.floor((Math.random() * replies.length));
    let question = args.slice(1).join(" ");

    let diceThumbnail = bot.user.displayAvatarURL;
    let diceEmbed = new Discord.RichEmbed()
    .setAuthor(message.author.tag)
    .setColor("#d63b3b")
    .setThumbnail(diceThumbnail)
    .addField(" 🎲 You rolled a...", replies[result]);

    message.channel.send(diceEmbed)
  }

  if(cmd == `${prefix}8ball`){
    if(!args[2]) return message.reply("Please ask a question!");
    let replies = ["Yes.", "No.", "I do not know that!", "Ask again later!", "Probably."];

    let result = Math.floor((Math.random() * replies.length));
    let question = args.slice(1).join(" ");

    let ballThumbnail = bot.user.displayAvatarURL;
    let ballEmbed = new Discord.RichEmbed()
    .setAuthor(message.author.tag)
    .setColor("#165ace")
    .setThumbnail(ballThumbnail)
    .addField("Question", question)
    .addField("Answer", replies[result]);

    message.channel.send(ballEmbed)
  }

  if(cmd == `${prefix}meow`){

    let {body} = await superagent
    .get(`http:\/\/aws.random.cat\/meow`);

    let catEmbed = new Discord.RichEmbed()
    .setColor("#99ff2d")
    .setTitle("Meow! :cat: ")
    .setImage(body.file);

    message.channel.send(catEmbed);

  }
  if(cmd == `${prefix}woof`){

    let {body} = await superagent
    .get(`https://random.dog/woof.json`);

    let dogEmbed = new Discord.RichEmbed()
    .setColor("#99ff2d")
    .setTitle("Woof! :dog: ")
    .setImage(body.url);

    message.channel.send(dogEmbed);

}

  if(cmd == `${prefix}help`){

    let botThumbnail = bot.user.displayAvatarURL;
    let helpEmbed = new Discord.RichEmbed()
    .setDescription("Incorrect usage!")
    .setColor("#3cbc49")
    .setThumbnail(botThumbnail)
    .addField("Use this command to find other commands:", `a!botinfo`)


    message.channel.send(helpEmbed)
  }


  if(cmd == `${prefix}ping`){

    let pongEmbed = new Discord.RichEmbed()
    .setDescription("Pong!")
    .setColor("#3cbc49")

    message.channel.send(pongEmbed)
  }

  if(cmd == `${prefix}ban`){

    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) message.channel.send("Could not find user.");
    let BREASON = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Sorry, I cant let you do that!");
    if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can not be banned!");

    let bannedEmbed = new Discord.RichEmbed()
    .setDescription("User banned")
    .setColor("#f21f1f")
    .addField("Banned user:", `${bUser} with the ID: ${bUser.id}`)
    .addField("Banned by:", `<@${message.author.id}> with the ID: ${message.author.id}`)
    .addField("Banned at:", message.createdAt)
    .addField("Ban sent in:", message.channel)

  if(cmd == `${prefix}adminhelp`){
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Sorry, I cant let you do that!");

    let bicon = bot.user.displayAvatarURL;
    let adminHelpEmbed = new Discord.RichEmbed()
    .setDescription("Bot information for administrator's")
    .setColor("#5d39ef")
    .setThumbnail(bicon)
    .addField("Bot name:", bot.user.username)
    .addField("Available commands:", availableCommands.AdminCommands)
    .addField("Created at:", bot.user.createdAt)
    .addField("Created by:", botOwners);

    message.channel.send(adminHelpEmbed)

  }



    let banChannel = message.guild.channels.find(`name`, "incidents");
    if(!banChannel) return message.channel.send("Couldn't find incidents channel!");

      message.guild.member(bUser).ban(BREASON)
      message.channel.send(`${bUser} was banned!`);
      banChannel.send(bannedEmbed);

  }

  if(cmd == `${prefix}kick`){

    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) message.channel.send("Could not find user.");
    let KREASON = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Sorry, I cant let you do that!");
    if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can not be kicked!");

    let kickedEmbed = new Discord.RichEmbed()
    .setDescription("User kicked")
    .setColor("#ff921e")
    .addField("Kicked user:", `${kUser} with the ID: ${kUser.id}`)
    .addField("Kicked by:", `<@${message.author.id}> with the ID: ${message.author.id}`)
    .addField("Kicked at:", message.createdAt)
    .addField("Kick sent in:", message.channel)

    try{
    await grUser.send(`You have been kicked from ${message.guild.name} discord server.`);
  }catch(e){
    message.channel.send(`${kUser} was kicked!`);
  }




    let kickChannel = message.guild.channels.find(`name`, "incidents");
    if(!kickChannel) return message.channel.send("Couldn't find incidents channel!");

      message.guild.member(kUser).kick(KREASON)
      kickChannel.send(kickedEmbed);

  }

if(cmd == `${prefix}report`){

      let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
      if(!rUser) return message.channel.send("Could not find user.");
      let REASON = args.join(" ").slice(22);


      let reportEmbedA = new Discord.RichEmbed()
      .setDescription("User reported")
      .setColor("#ff921e")
      .addField("Reported user:", `${rUser} with the ID: ${rUser.id}`)
      .addField("Reported by:", `${message.author} with the ID: ${message.author.id}`)
      .addField("Report created at:", message.createdAt)
      .addField("Report created in:", message.channel)
      .addField("Reason:", REASON);

      let reportChannel = message.guild.channels.find(`name`, "reports");
      if(!reportChannel) return message.channel.send("Couldn't find reports channel!");

      message.delete().catch(O_o=>{});
        message.channel.send("Your report was sent and will be reviewed soon!");
        reportChannel.send(reportEmbedA);
}

if(cmd == `${prefix}serverinfo`){

      let sicon = message.guild.iconURL;
      let serverembed = new Discord.RichEmbed()
      .setDescription("Server information")
      .setColor("#5d39ef")
      .setThumbnail(sicon)
      .addField("Server name:", message.guild.name)
      .addField("Server created at:", message.guild.createdAt)
      .addField("You joined the server at", message.member.joinedAt)
      .addField("Total members", message.guild.memberCount)
      .addField("Server owners", botOwners);



    return message.channel.send(serverembed)
  }

  if(cmd == `${prefix}botinfo`){

      let bicon = bot.user.displayAvatarURL;
      let botembed = new Discord.RichEmbed()
      .setDescription("Bot information")
      .setColor("#5d39ef")
      .setThumbnail(bicon)
      .addField("Bot name:", bot.user.username)
      .addField("Available commands:", availableCommands.PublicCommands)
      .addField("Created at:", bot.user.createdAt)
      .addField("Created by:", botOwners);


      return message.channel.send(botembed)
    }

});

bot.login(botconfig.token);
