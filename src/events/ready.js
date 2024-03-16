const { ActivityType } = require("discord.js");

module.exports = async (client) => {

  const statusArray = [
    {
      type: ActivityType.Watching,
      content: `${client.users.cache.size} usuários.`,
    },
    {
      type: ActivityType.Competing,
      content: `🛠️ | Ainda estou sendo desenvolvido!`,
    },
    {
      type: ActivityType.Competing,
      content: `❤️ | Feito pelo ${process.env.autor}`,
    },
  ];

  async function pickPresence() {
    const option = Math.floor(Math.random() * statusArray.length);

    client.user.setActivity(statusArray[option].content, {
      type: statusArray[option].type,
    });
  }
  setInterval(pickPresence, 30 * 1000);
};