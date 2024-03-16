const { EmbedBuilder } = require("discord.js");

module.exports = async (client, oldMessage, newMessage) => {
  const channel = oldMessage.guild?.channels.cache.get(process.env.logscanal);
  if (!channel) return;

  if (oldMessage.author.bot || newMessage.author.bot || oldMessage.channel.type === "dm") return;

  const embed = new EmbedBuilder()
    .setColor("#FFFF00")
    .setTitle(`🔔 Log do Servidor`)
    .setThumbnail(oldMessage.author.displayAvatarURL({ dynamic: true, size: 4096 }))
    .setDescription(`:pencil: Mensagem Editada

  💥 **Infos:**
  > Nick: ${oldMessage.author.tag}
  > ID: ${oldMessage.author.id}
  > Canal: ${oldMessage.channel}`)
    .addFields(
      {
        name: `Mensagem antiga`,
        value: `\`\`\`${oldMessage.content.slice(0, 1023) || "Nenhum conteúdo foi identificado"}\`\`\``,
      },
      {
        name: `Mensagem Modificada`,
        value: `\`\`\`${newMessage.content.slice(0, 1023) || "Nenhum conteúdo foi identificado"}\`\`\``,
      }
    )
    .setTimestamp();

  channel.send({ embeds: [embed] });
};
