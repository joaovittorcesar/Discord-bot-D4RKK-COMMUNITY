module.exports = async (client, interaction) => {

  if (interaction.isButton())
    try {
      require(`../button/${interaction.customId}`)(client, interaction);
    } catch (erro) {
      console.error(erro);
      return interaction.reply({ content: 'Houve um erro ao processar esta interaction de botão.', ephemeral: true });
    }

  if (interaction.isCommand()) {
    const command = client.comandos.get(interaction.commandName);

    if (!command) return;

    try {
      command.execute(interaction, client);
    } catch (erro) {
      console.error(erro);
      await interaction.reply({ content: 'Houve um erro ao executar este comando.', ephemeral: true });
    }
  }
}
