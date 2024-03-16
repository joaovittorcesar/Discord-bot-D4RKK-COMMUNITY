const discord = require("discord.js");

module.exports = async (client, interaction) => {
    const data = new Date();
    const dia = data.getDate().toString();
    const diaF = dia.length === 1 ? "0" + dia : dia;
    const mes = (data.getMonth() + 1).toString(); // +1 pois no getMonth Janeiro começa com zero.
    const mesF = mes.length === 1 ? "0" + mes : mes;
    const anoF = data.getFullYear();
    interaction.guild.channels
        .create({
            name: `bug-${interaction.user.tag}`,
            type: discord.ChannelType.GuildText,
            parent: process.env.ticketcategoria, // Coloque o ID DA CATEGORIA
            topic: `${interaction.member} este é seu ticket de reporte!`,
            permissionOverwrites: [
                {
                    id: interaction.guild.id,
                    deny: [discord.PermissionFlagsBits.ViewChannel],
                },
                {
                    id: interaction.user.id,
                    allow: [
                        discord.PermissionFlagsBits.ReadMessageHistory,
                        discord.PermissionFlagsBits.ViewChannel,
                        discord.PermissionFlagsBits.SendMessages,
                        discord.PermissionFlagsBits.AttachFiles,
                        discord.PermissionFlagsBits.AddReactions,
                    ],
                },
                {
                    id: process.env.directioncargo,
                    allow: [
                        discord.PermissionFlagsBits.ViewChannel,
                        discord.PermissionFlagsBits.SendMessages,
                        discord.PermissionFlagsBits.AttachFiles,
                        discord.PermissionFlagsBits.AddReactions,
                    ],
                },
                {
                    id: process.env.admincargo,
                    allow: [
                        discord.PermissionFlagsBits.ViewChannel,
                        discord.PermissionFlagsBits.SendMessages,
                        discord.PermissionFlagsBits.AttachFiles,
                        discord.PermissionFlagsBits.AddReactions,
                    ],
                },
                {
                    id: process.env.supcargo,
                    deny: [
                        discord.PermissionFlagsBits.ViewChannel,
                        discord.PermissionFlagsBits.SendMessages,
                        discord.PermissionFlagsBits.AttachFiles,
                        discord.PermissionFlagsBits.AddReactions,
                    ],
                },
                {
                    id: process.env.verticket,
                    allow: [
                        discord.PermissionFlagsBits.ViewChannel,
                        discord.PermissionFlagsBits.SendMessages,
                        discord.PermissionFlagsBits.AttachFiles,
                        discord.PermissionFlagsBits.AddReactions,
                    ],
                },
            ],
        })
        .then((c) => {

            interaction.reply({
                content: `Seu ticket foi aberto com sucesso!! [Clique aqui para ir até ele.](${c.url})`,
                ephemeral: true
            }).then((msg) => {
                setTimeout(() => {
                    msg.delete()
                }, 10000)
            })

            c.send({
                content: `${interaction.member}`,
                embeds: [
                    new discord.EmbedBuilder()
                        .setAuthor({ name: "Bem Vindo(a) á central de atendimento." })
                        .setDescription(
                            `Olá **${interaction.member}** Aguarde que em breve um membro de nossa equipe prestará seus devidos atendimentos.

**Tempo máximo de resposta:**
24 horas

**Ticket aberto em:**
${diaF + "/" + mesF + "/" + anoF}
`
                        )
                        .setTimestamp(new Date())
                        .setColor("Blue"),
                ],
                components: [
                    new discord.ActionRowBuilder().addComponents(
                        new discord.ButtonBuilder()
                            .setCustomId("fecharticket")
                            .setLabel("Fechar Ticket")
                            .setEmoji("🎫")
                            .setStyle(discord.ButtonStyle.Danger)
                    ),
                ],
            }).then((msg) => {
                msg.channel.send("Chamando os Membros da equipe: <@&1071982235374321704>")
                    .then((msg) => {
                        msg.pin();
                        setTimeout(() => {
                            msg.delete()
                                .catch((error) => {
                                    console.error(`Erro ao apagar a mensagem: ${error}`);
                                });
                        }, 500);
                    })
                    .catch((error) => {
                        console.error(`Erro ao enviar a mensagem: ${error}`);
                    });

            });
        })
};
