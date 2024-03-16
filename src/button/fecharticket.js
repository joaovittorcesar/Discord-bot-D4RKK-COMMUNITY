const discord = require("discord.js");
const discordTranscripts = require("discord-html-transcripts");

module.exports = async (client, interaction, args) => {
  if (
    !interaction.member.roles.cache.some((x) =>
      process.env.membrosequipe.includes(x.id)
    )
  ) {
    return interaction.reply({
      content: "🚫 | Você não tem permissão para fechar este ticket!",
      ephemeral: true
    });
  }

  interaction.reply({
    embeds: [
      new discord.EmbedBuilder()
        .setColor("#560805")
        .setTitle("Fechando ticket")
        .setDescription(
          `
🔏 Ticket considerado resolvido! 
> 🚧 Fechando em 15 segundos(exatos).

⚠️ Aviso:
> Este ticket você não poderá mais conversar nele!
`
        )
        .setFooter({ text: process.env.footer }),
    ],
  })
    .then(() => {
      interaction.channel.permissionOverwrites.edit(interaction.user.id, {
        SendMessages: false,
        AttachFiles: false,
        AddReactions: false,
      });
      interaction.message.components[0].components[0].disabled = true;

      interaction.message.edit({
        components: interaction.message.components,
      });
    })

    .then(() => {
      setTimeout(() => {
        interaction.channel.delete();
      }, 15000);
    })
    .then(async () => {
      const channel = interaction.channel;

      const attachment = await discordTranscripts.createTranscript(channel, {
        limit: -1,
        returnType: "attachment",
        fileName: "transcript.html",
        minify: true,
        saveImages: false,
        useCDN: false,
      });

      const embedticketcloselog = new discord.EmbedBuilder()
        .setColor("#560805")
        .setTitle("🔔 Log do Servidor")
        .setDescription(
          `:pencil: Transcript de ticket

💥 **Infos:**
> Canal:
\`\`\`${interaction.channel.name}\`\`\`

⚠️ Aviso:
> Temos o transcript salvo das conversas dos membros e staffers, para casos futuros de punições!
> Apenas baixar o transcript e abrir pelo seu navegador padrão!`
        )
        .setTimestamp();

      const logsChannel = client.channels.cache.get(process.env.logscanal);
      logsChannel.send({
        embeds: [embedticketcloselog],
        files: [attachment],
      });
    });
};
