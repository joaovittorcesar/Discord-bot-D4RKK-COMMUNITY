const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "convite",
  description: "Convide mais pessoas para o nosso discord",
  category: "Default",

  run: async (interaction, client) => {

    const embed = new EmbedBuilder()
      .setTitle("Convide mais pessoas!")
      .setDescription(
        `👋 Olá ${interaction.member}, não se esqueça de convidar mais membros para nosso discord!

> https://discord.gg/BnhraJegpN`
      )
      .setColor(client.cores.padrão)
      .setTimestamp();

    return interaction.reply({ embeds: [embed] });
  },
};
