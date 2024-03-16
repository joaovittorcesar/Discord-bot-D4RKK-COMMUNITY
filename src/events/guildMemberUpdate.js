const discord = require("discord.js");

module.exports = async (client, oldMember, newMember) => {
    const oldStatus = oldMember.premiumSince;
    const newStatus = newMember.premiumSince;

    if (!oldStatus && newStatus) {
        const embed = new discord.EmbedBuilder()
            .setColor(client.cores.padrão)
            .setTitle("BOOSTED")
            .setDescription(`:rocket: **${newMember} obrigado pelo impulso!** ♥️`)
        //.setImage('')

        client.channels.cache
            .get(process.env.boostchannel)
            .send({ embeds: [embed] });
    }

    if (oldMember.nickname !== newMember.nickname) {
        const antigoNick = oldMember.nickname || "🤷 Nenhum apelido";
        const novoNick = newMember.nickname || "🤷 Nenhum apelido";

        const embed = new discord.EmbedBuilder()
            .setColor("#00FF00")
            .setAuthor({ name: `🔔 Nickname alterado ` + newMember.user.tag })
            .setThumbnail(
                newMember.user.displayAvatarURL({ dynamic: true, size: 4096 })
            )
            .setDescription(
                `📝 **Um novo apelido de um jogador foi modificado**

**Antigo nickname:**
 \`\`\`${antigoNick}\`\`\`
**Novo nickname:**
 \`\`\`${novoNick}\`\`\`
📡 Extras:
**ID:** \`${oldMember.id}\``
            )
            .setTimestamp();

        client.channels.cache.get(process.env.logscanal).send({ embeds: [embed] });
    }
};
