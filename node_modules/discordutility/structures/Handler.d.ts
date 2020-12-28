import { Dirs } from "../interfaces/dirs";
import { Message } from "discord.js";
export declare class Handler {
    bot: any;
    commandFolder: string;
    eventFolder: string;
    prefix: string;
    constructor(client: any, dirs: Dirs, prefix: string);
    runCommand(message: Message): Promise<void>;
    loadCommands(): this;
    loadEvents(): this;
    getCommand(command: string): any;
    getAlias(alias: string): any;
    getAllCommands(): any[];
}
