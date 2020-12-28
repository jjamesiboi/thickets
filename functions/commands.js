const { readdirSync } = require("fs");
const { join } = require("path");
const filePath = join(__dirname, "..", "commands");
const fs = require("fs");

const functions = require("./functions.js");

module.exports.run = (bot) => {
    functions.loadCommands(bot, `${filePath}/Utilities/`);
    functions.loadCommands(bot, `${filePath}/Information/`);
    functions.loadCommands(bot, `${filePath}/Administration/`);
    functions.loadCommands(bot, `${filePath}/Vouching/`);
}