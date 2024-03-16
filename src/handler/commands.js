const fs = require("fs")
const { ChalkAdvanced } = require("chalk-advanced");

module.exports = async (client) => {

  const SlashsArray = []

  fs.readdir(`./src/commands`, (error, folder) => {
    folder.forEach(subfolder => {
      fs.readdir(`./src/commands/${subfolder}/`, (error, files) => {
        files.forEach(files => {

          if (!files?.endsWith('.js')) return;
          files = require(`../commands/${subfolder}/${files}`);
          if (!files?.name) return;
          client.slashCommands.set(files?.name, files);

          SlashsArray.push(files)

          console.log(
            `${ChalkAdvanced.gray(">")} ${ChalkAdvanced.green(
              "Os comandos foram registrado com sucesso globalmente!"
            )}`
          );
        });
      });
    });
  });

  client.on("ready", async () => {
    client.guilds.cache.forEach(guild => guild.commands.set(SlashsArray))
  });
};