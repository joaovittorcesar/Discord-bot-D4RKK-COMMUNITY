module.exports = async (client, member) => {
  const channel = member.guild?.channels.cache.get(process.env.logscanal);
  if (!channel) return 0;

  channel.send(
    `> ${member.user} entrou no servidor, agora temos ${member.guild.memberCount} membros!`
  );
};
