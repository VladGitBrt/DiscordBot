const Discord = require("discord.js");
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
const fs = require("fs");
let config = require("./botconfig.json");
let token = config.token;
let prefix = config.prefix;

fs.readdir("./cmds/", (err, files) => {
  if (err) {
    console.log("GG pros");
  }
  let jsfiles = files.filter((f) => f.split(".").pop() === "js");
  if (jsfiles.length <= 0) {
    console.log("No commands");
  }
  console.log(`Loaded ${jsfiles.length} commands`);
  jsfiles.forEach((f, i) => {
    let props = require(`./cmds/${f}`);
    console.log(`${i + 1})${f} Loaded!`);
    bot.commands.set(props.help.name, props);
  });
});
bot.on("ready", () => {
  bot.user.username = "VtubersWorld [RU]";
  console.log(`Bot ready ${bot.user.username}`);
  bot.generateInvite(["ADMINISTRATOR"]).then((link) => {
    console.log(link);
  });
});

bot.on("message", async (msg) => {
  if (msg.author.bot) {
    return;
  }
  if (msg.channel.type == "dm") {
    console.log("i can hear you");
  }

  let arr = [
    "Aboba",
    "ababo",
    "ABOBA",
    ":a::b::o2::b::a:",
    "обоба",
    "абуба",
    "абеба",
    "обобе",
    "оубоба",
    "омегабоба",
    "ебуба",
    "ебиба",
    "ебобуна",
    "ебиба",
    "абоба",
    "aboba",
  ];

  if (arr.some((w) => ` ${msg.content.toLowerCase()} `.includes(` ${w} `))) {
    msg.delete();
    let myRole = msg.guild.roles.cache.find((role) => role.name === "абобер");
    var users = msg.guild.members.cache.get(`${msg.author.id}`);
    msg.channel.send(
      `${users} получает роль ${myRole} и отправляется в тюрьму за употребление любого вида слова "абоба"`
    );
    users.roles.add(myRole).catch(console.error);
  }

  let user = msg.author.username;
  let userid = msg.author.id;
  let messageArray = msg.content.split(" ");
  let command = messageArray[0].toLowerCase();
  let args = messageArray.slice(1);
  if (!msg.content.startsWith(prefix)) {
    return;
  }
  let cmd = bot.commands.get(command.slice(prefix.length));
  if (cmd) {
    cmd.run(bot, msg, args);
  }
});

bot.login(token);
