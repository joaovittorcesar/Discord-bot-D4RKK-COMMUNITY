const { QuickDB } = require('quick.db');
const db = new QuickDB();
const discord = require('discord.js');
const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');

module.exports = async (client, message) => {

    if (!message.guild || message.author.bot) return;

    const chatgpt_api_key = process.env.tokengpt;
    xp(message);

    if ([`<@${client.user.id}>`].includes(message.content)) {
        message.reply({
            content: `
<:Perfeito:929882139099562015> **|** Olá ${message.member}! Meus comandos são em \`SlashCommands(/)\`!
> Feito com ❤️ pelo ${process.env.autor}

📌 **Extras**
- Ping do bot: \`${Math.round(client.ws.ping)}\` ms
- Seu ID: \`${message.member.id}\`
`
        });
    }

    // Chat GPT

    function handleError(message, errorMessage) {
        message.reply({
            content: errorMessage,
            allowedMentions: { repliedUser: true },
        });
    }

    async function createHtmlFile(content, channel) {
        try {
            const htmlFileName = `Whosh_${Date.now()}.html`;
            const htmlFilePath = path.join(__dirname, htmlFileName);
            await fs.writeFile(htmlFilePath, `<html><body>${content}</body></html>`, 'utf-8');

            const attachment = new discord.MessageAttachment(htmlFilePath);
            await channel.send({ content: 'Mensagem com HTML anexado:', files: [attachment] });

            console.log('Mensagem com HTML enviada com sucesso para o Discord!');
            return htmlFilePath; // Retorna o caminho do arquivo HTML temporário
        } catch (error) {
            console.error('Erro ao enviar a mensagem para o Discord:', error.message);
            return null;
        }
    }

    if (message.channel.name === "chatbot") {
        if (message.author.bot) return;

        message.content = message.content
            .replace(/@(everyone)/gi, "everyone")
            .replace(/@(here)/gi, "here");

        if (message.content.includes(`@`)) {
            return message.reply({
                content: "**:x: Por favor, não mencione ninguém!**",
                allowedMentions: { repliedUser: true },
            });
        }

        if (!message.content) {
            return message.reply({
                content: "Por favor, fale alguma coisa.",
                allowedMentions: { repliedUser: true },
            });
        }

        try {
            message.channel.sendTyping();

            const response = await axios.post(
                'https://api.openai.com/v1/chat/completions',
                {
                    model: 'gpt-3.5-turbo-16k',
                    messages: [
                        { role: 'system', content: 'Você é um assistente útil.' },
                        { role: 'user', content: `${message.content}` },
                    ],
                },
                {
                    headers: {
                        'Authorization': `Bearer ${chatgpt_api_key}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.data.choices) {
                const reply = response.data.choices[0]?.message?.content?.trim();

                if (reply) {
                    if (reply.length <= 2000) {
                        message.reply({
                            content: reply,
                            allowedMentions: { repliedUser: true },
                        });
                    } else {
                        const htmlFilePath = await createHtmlFile(reply, message.channel);
                        message.reply({
                            content: 'A resposta é muito longa. Aqui está um arquivo HTML:',
                            files: [htmlFilePath],
                        });
                    }
                } else {
                    console.error("Resposta inválida da API do ChatGPT:", response.data);
                    handleError(message, "Ocorreu um erro ao processar sua solicitação.");
                }
            } else
                if (response.data && response.data.error && response.data.error.code === 'rate_limit_exceeded') {
                    // Aguarda 20 segundos e tenta novamente
                    console.log('Limite de taxa atingido. Aguardando 20 segundos...');
                    await new Promise(resolve => setTimeout(resolve, 20000));
                    console.log('Tentando novamente...');
                    await handleChatMessage(client, message);
                }
        } catch (error) {
            console.error("Erro ao chamar a API do ChatGPT:", error.response?.data || error.message);
            handleError(message, "Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente mais tarde.");
        }
    }

    // XP

    async function xp(message) {
        let xpReward;

        xpReward = Math.floor(Math.random() * 4) + 4; // se achar muito, muda pra 2 até 4.
        if (xpReward === 0) xpReward = 10;
        const xp = await db.get(`xp_${message.guild.id}_${message.member.id}`);
        const level = (await db.get(`level_${message.guild.id}_${message.member.id}`)) || 0;
        const level2 = level + 1;
        const levels = level2 * 1000;

        // Verifica se o objeto xp foi definido
        if (!xp) {
            await db.add(`xp_${message.guild.id}_${message.member.id}`, xpReward);
        } else if (xp) {
            await db.add(`xp_${message.guild.id}_${message.member.id}`, xpReward);
        }

        if (xp > levels) {
            const levelUpKey = `level_up_${message.guild.id}_${message.member.id}`;
            const hasLeveledUp = await db.get(levelUpKey);

            if (!hasLeveledUp) {
                await db.add(`level_${message.guild.id}_${message.member.id}`, 1);
                await db.add(`required_${message.guild.id}_${message.member.id}`, 1000);

                // Define que o usuário subiu de nível para não enviar a mensagem novamente até o próximo nível
                await db.set(levelUpKey, true);

                // Envia a mensagem de parabéns pelo novo nível
                message.channel
                    .send(`🚀 | Parabéns <@${message.member.id}>, você chegou ao nível **${level2}**. GG!`)
                    .then((message) => {
                        message.react('✅');
                    });

                // Define as tags
                const guild = client.guilds.cache.get(process.env.guildid);
                const member = guild.members.cache.get(message.member.id);

                const role1 = guild.roles.cache.get('1161034862665412639');
                const role2 = guild.roles.cache.get('1161034926414643209');
                const role3 = guild.roles.cache.get('1161034953971208283');
                const role4 = guild.roles.cache.get('1161037946305122404');
                const role5 = guild.roles.cache.get('1161037997685358674');
                const role6 = guild.roles.cache.get('1161038056980238388');
                const role7 = guild.roles.cache.get('1161038140363002007');
                const role8 = guild.roles.cache.get('1161038194188484649');
                const role9 = guild.roles.cache.get('1161038239281463377');

                if (!role1 || !role2 || !role3 || !role4 || !role5 || !role6 || !role7 || !role8 || !role9) {
                    console.error('Cargo não encontrado no servidor!');
                    return;
                }

                let roleToAdd;
                if (level2 == 1) {
                    roleToAdd = role1;
                } else if (level2 == 10) {
                    roleToAdd = role2;
                } else if (level2 == 25) {
                    roleToAdd = role3;
                } else if (level2 == 35) {
                    roleToAdd = role4;
                } else if (level2 == 50) {
                    roleToAdd = role5;
                } else if (level2 == 60) {
                    roleToAdd = role6;
                } else if (level2 == 70) {
                    roleToAdd = role7;
                } else if (level2 == 80) {
                    roleToAdd = role8;
                } else if (level2 == 90) {
                    roleToAdd == role9;
                }

                if (roleToAdd) {
                    member.roles.add(roleToAdd)
                        .then(() => {
                            const roleMessage = `⭐ <@${message.author.id}>, você ganhou o cargo ${roleToAdd}!`;
                            message.channel.send(roleMessage);
                        })
                        .catch(console.error);
                }
            }
        }
    }
}