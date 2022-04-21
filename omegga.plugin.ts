import OmeggaPlugin, { OL, PS, PC } from 'omegga';
import chat from '../omegga/src/omegga/matchers/chat';

type Config = { foo: string };
type Storage = { bar: string };

export default class Plugin implements OmeggaPlugin<Config, Storage> {
  omegga: OL;
  config: PC<Config>;
  store: PS<Storage>;

  constructor(omegga: OL, config: PC<Config>, store: PS<Storage>) {
    this.omegga = omegga;
    this.config = config;
    this.store = store;
  }

  async init() {
    // Write your plugin!
    /*
    this.omegga.on('cmd:test', (speaker: string) => {
      this.omegga.broadcast(`Hello, ${speaker}!`);
    });

    this.omegga.on('cmd:kille', (speaker: string) => {
      this.omegga.broadcast(`Hello, ${speaker}!`);

    });
    */

    this.omegga.on('cmd:onion',
    async (speaker: string, subcommand: string, ...args: string[]) => {
        if(Omegga.getPlayer(speaker).isHost()){
          const player = this.omegga.getPlayer(speaker);
          if(subcommand == 'kill') {
            const player = args.join(' ');
            this.omegga.findPlayerByName(player).kill;
          }
        }
    });
    
    return { registeredCommands: ['onion'] };
  }

  async stop() {
    // Anything that needs to be cleaned up...
  }
}
