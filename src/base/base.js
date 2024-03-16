const Discord = require("discord.js")

module.exports = {
    name: "", // Coloque o nome do comando
    description: "", // Coloque a descrição do comando
    category: "",
    type: Discord.ApplicationCommandType.ChatInput,
    dm_permission: false,
    default_member_permissions: [Discord.PermissionFlagsBits],
    options: [],

    run: async (client, interaction) => {


    }
}