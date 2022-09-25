import Bot from "../../bot";
import { CustomCommandBuilder } from "../loaderTypes";
import fs from "fs"
import path from "path"
import { Client } from "discord.js";
import chalk from "chalk";

export default class Module {
    private client?: Client
    private commands: Map<string, CustomCommandBuilder> = new Map();

     name: string = ""
     description: string = ""

    constructor(bot: Bot) {
        this.client = bot.client;
    }

    /**
     * Override this method to run code when the module is loaded
     */
    async onLoad(): Promise<Boolean> {
        console.log(chalk.bgBlue(`[${this.name}]`), "Loaded", chalk.yellow(this.name), "module");
        return true;
    }

    /**
     * Override this method to run code when the module is unloaded
     */
    async onUnload(): Promise<Boolean> {
        console.log(`Unloaded module ${this.name}`);
        return true;
    }
         
    public async loadCommands() {
        if (!fs.existsSync(path.resolve(`./dist/bot/modules/${this.name}/commands`))) {
            console.log(`No commands found for module ${this.name}, skipping...`)
            return []
        }
        const commandFolder = fs.readdirSync(path.resolve(`./dist/bot/modules/${this.name}/commands`));
        let commands: CustomCommandBuilder[] = [];
        for (const commandFile of commandFolder) {
            const command = require(path.resolve(`./dist/bot/modules/${this.name}/commands/${commandFile}`)).default as CustomCommandBuilder;
            command.setModule(this.name);            
            commands.push(command);
        }

        return commands;
    }

    public getCommands() {
        return this.commands;
    }
}