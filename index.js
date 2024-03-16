const { Client, Collection } = require("discord.js")
const client = new Client({ intents: 32767, partials: ["REACTION", "USER"] });
require("dotenv").config();

// Clients
client.cores = require("./src/data/cores.json");
client.slashCommands = new Collection()

require('./src/handler/commands')(client)
require('./src/handler/events')(client)

//AntiCrash
process.on("unhandledRejection", (error) => {
  console.log(error);
});
process.on("uncaughtException", (error) => {
  console.log(error);
});

client.login(process.env.TOKEN)