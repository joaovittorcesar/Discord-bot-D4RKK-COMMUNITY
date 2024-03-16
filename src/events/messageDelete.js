const { EmbedBuilder, MessageAttachment } = require("discord.js");

module.exports = async (client, oldMessage) => {
  const channel = oldMessage.guild?.channels.cache.get(process.env.logscanal);
  if (!channel) return;

  console.log(oldMessage)

  if (oldMessage.author.bot || oldMessage.channel.type === "dm") return;

  let imagens = "Nenhuma imagem foi identificada.";
  let imagensAntigas = [];

  // Verifica se há anexos na mensagem antiga
  if (oldMessage.attachments.size > 0) {
    imagensAntigas = oldMessage.attachments.map((attachment) => {
      return new MessageAttachment(attachment.url);
    });
    imagens = "Veja a imagem antiga";
  }

  const embed = new EmbedBuilder()
    .setColor("#FF0000")
    .setTitle(`🔔 Log do Servidor`)
    .setThumbnail(oldMessage.author.displayAvatarURL({ dynamic: true, size: 4096 }))
    .setDescription(`:wastebasket: Mensagem Deletada

💥 **Infos:**
> Nick: ${oldMessage.author.tag}
> ID: ${oldMessage.author.id}
> Canal: <#${oldMessage.channel.id}>

📄 **Conteúdo da Mensagem:**
\`\`\`${oldMessage.content || "Nenhum conteúdo foi identificado."}\`\`\`

🖼️ **Imagem Antiga:**
\`\`\`${imagens}\`\`\``)
    .setTimestamp();

  await channel.send({ embeds: [embed], files: imagensAntigas });
};
