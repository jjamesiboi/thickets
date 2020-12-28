"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const discord_js_1 = require("discord.js");
const path_1 = __importDefault(require("path"));
class Handler {
    constructor(client, dirs, prefix) {
        this.bot = client;
        this.commandFolder = dirs.commandFolder;
        this.eventFolder = dirs.eventFolder;
        this.prefix = prefix;
        this.bot.commands = new discord_js_1.Collection();
        this.bot.aliases = new discord_js_1.Collection();
    }
    runCommand(message) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!message.content.startsWith(this.prefix))
                return;
            const args = message.content.slice(this.prefix.length).trim().split(/ +/g);
            const cmd = args.shift().toLowerCase();
            const command = this.getCommand(cmd) || this.getCommand(this.getAlias(cmd));
            if (!command)
                return;
            try {
                yield command.run(this.bot, message, args);
            }
            catch (e) {
                console.log(e);
            }
            ;
        });
    }
    loadCommands() {
        fs_1.readdir(this.commandFolder, (err, files) => {
            files.filter((f) => {
                if (!f.endsWith(".js"))
                    console.log(f + " isn't a .js file!");
                return f.endsWith(".js");
            });
            for (const file of files) {
                try {
                    const cmd = require(`${path_1.default.dirname(require.main.filename)}/${this.commandFolder}/${file}`);
                    this.bot.commands.set(cmd.name, cmd);
                    if (cmd.aliases)
                        cmd.aliases.forEach((alias) => this.bot.aliases.set(alias, cmd.name));
                    console.log(`Successfully loaded: ${file}`);
                }
                catch (e) {
                    console.log(`Couldn't load ${file}, error: ${e.toString()}`);
                }
            }
        });
        return this;
    }
    loadEvents() {
        fs_1.readdir(this.eventFolder, (err, events) => {
            if (err)
                console.log(err);
            events.filter((f) => {
                if (!f.endsWith(".js"))
                    console.log(f + " isn't a .js file!");
                return f.endsWith(".js");
            });
            for (const event of events) {
                const evt = require(`${path_1.default.dirname(require.main.filename)}/${this.eventFolder}/${event}`);
                const eName = event.split(".")[0];
                try {
                    this.bot.on(eName, evt.bind(null, this.bot));
                    console.log(`Successfully loaded: ${event}`);
                }
                catch (e) {
                    console.log(`You didn't export correctly at ${event}`);
                }
            }
        });
        return this;
    }
    getCommand(command) {
        return this.bot.commands.get(command) || null;
    }
    getAlias(alias) {
        return this.bot.aliases.get(alias) || null;
    }
    getAllCommands() {
        return this.bot.commands.map((x) => x) || null;
    }
}
exports.Handler = Handler;
