module.exports = async (client, interaction) => {
  const member = interaction.member;
  const user = interaction.guild.members.cache.get(member.id);
  const role = '1211383807626977322';

  if (!member.roles.cache.has(role)) {
    await member.roles.add(role);

    const channel = interaction.channel;
    const verificationMessage = await interaction.reply(`${interaction.user}, Você se verificou com sucesso, divirta-se!`);

    setTimeout(async () => {
      try {
        await verificationMessage.delete();
      } catch (error) {
        console.error('Erro ao excluir a mensagem de verificação:', error);
      }
    }, 5000);
  } else {
    await interaction.reply({ content: `${interaction.user}, Você já está verificado!`, ephemeral: true });
  }
};
