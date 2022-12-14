import { Client } from "discord.js";
import ModuleLoader from "./loaders/moduleLoader";
import CommandLoader from "./loaders/commandLoader";
import ButtonManager from "./loaders/managers/buttonManager";
import SelectMenuManager from "./loaders/managers/selectMenuManager";
import ModalManager from "./loaders/managers/modalManager";
import chalk from "chalk";

export default class Bot {

    commandLoader: CommandLoader
    moduleLoader: ModuleLoader

    buttonManager: ButtonManager
    selectMenuManager: SelectMenuManager
    modalManager: ModalManager
  
  constructor(public client: Client) {
    this.client
      .on("ready", () => {
        console.info(chalk.bgBlue(`[Discord]`) ,`Logged in as ${chalk.green(this.client.user?.tag)}`);

      })
      
    this.commandLoader = new CommandLoader(this.client);
    this.moduleLoader = new ModuleLoader(this);
    
    this.buttonManager = new ButtonManager(this.client);
    this.selectMenuManager = new SelectMenuManager(this.client);
    this.modalManager = new ModalManager(this.client);
  }
}
