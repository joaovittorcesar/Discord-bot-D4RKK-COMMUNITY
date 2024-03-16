const { readdirSync } = require('fs');
const { ChalkAdvanced } = require("chalk-advanced");
const path = require('path');

module.exports = async (client) => {
    const eventFiles = readdirSync(path.join(__dirname, '../events'));

    for (const file of eventFiles) {
        const eventName = file.split('.')[0];
        const event = require(`../events/${file}`);

        try {
            client.on(eventName, event.bind(null, client));
            console.log(`${'[ Eventos ]'} Evento ${eventName} carregado.`);
        } catch (error) {
            console.log(`${'[ Eventos ]'} Houve um erro em evento ${eventName}\nErro:`, error);
        }
    }

    console.log(
        `${ChalkAdvanced.gray(">")} ${ChalkAdvanced.green(`Eventos carregados com sucesso!`)}`
    );
};
