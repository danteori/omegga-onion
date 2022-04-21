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

    const sleep = (time: number) => new Promise(resolve => setTimeout(resolve, time));

    this.omegga.on('cmd:onion',
    async (speaker: string, subcommand: string, ...args: string[]) => {
        if(Omegga.getPlayer(speaker).isHost()){
          const player = this.omegga.getPlayer(speaker);
          if(subcommand == 'kill') {
            const target = args.join(' ');
            Omegga.middlePrint(player, "Kill command attempted on player " + target);
            Omegga.findPlayerByName(target).kill();
          }
          if(subcommand == 'midall'){
            const message = args.join(' ');
            MidAll(message);
          }
          if(subcommand == 'saveenv'){
            const filename = args.join(' ');
            Omegga.saveEnvironment(filename);
          }
          if(subcommand == 'dmsg'){
            const message = args.join(' ');
            Omegga.saveEnvironment("godarktemp");
            Omegga.loadEnvironment("godark");
            await sleep(1000);
            MidAll(message);
            await sleep(6000);
            Omegga.loadEnvironment("godarktemp");
          }
          if(subcommand == 'lmsg'){
            const message = args.join(' ');
            Omegga.saveEnvironment("golighttemp");
            Omegga.loadEnvironment("golight");
            await sleep(1000);
            MidAll(message);
            await sleep(6000);
            Omegga.loadEnvironment("golighttemp");
          }
        }
    });

    const MidAll = (message: string) => {
      for(const p of Omegga.players){
        Omegga.middlePrint(p, message);
      }
    }
    
    return { registeredCommands: ['onion'] };
  }

  

  async stop() {
    // Anything that needs to be cleaned up...
  }
}
