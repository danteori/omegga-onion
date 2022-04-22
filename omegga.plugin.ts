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

    //await this.store.set("bar", "e"); 
    //store.set("duelOffers", []);
    this.omegga.on('cmd:onion',
    async (speaker: string, subcommand: string, ...args: string[]) => {
        if(subcommand == 'accept'){
          //start duel
        }
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
          if(subcommand == 'pmsg'){
            const message = args.join(' ');
            Omegga.saveEnvironment("gopisstemp");
            Omegga.loadEnvironment("gopiss");
            await sleep(1000);
            MidAll(message);
            await sleep(6000);
            Omegga.loadEnvironment("gopisstemp");
          }
          if(subcommand == 'saveminigame'){
            Omegga.saveMinigame(parseInt(args[0]), args[1]);
          }
          if(subcommand == 'loadminigame'){
            Omegga.loadMinigame(args[0], player.id);
          }
          if(subcommand == 'loadminigameowner'){
            const target = Omegga.findPlayerByName(args[1]);
            let pos = await target.getPosition();
            Omegga.middlePrint(player, pos.toString());
            Omegga.loadMinigame(args[0], target.id);
            Omegga.writeln(`Chat.Command /TP "${target}" ${pos.join(" ")} 1`)
            
          }
          if(subcommand == 'replaceminigame'){
            Omegga.deleteMinigame(0);
            Omegga.loadMinigame(args[0], player.id);
          }
          if(subcommand == 'deleteminigame'){
            Omegga.deleteMinigame(0);
          }
          if(subcommand == 'duel'){
            const target = Omegga.findPlayerByName(args[0]);
            Omegga.middlePrint(player, "You are now dueling " + target.name);
            //await this.store.set("duel")
            Omegga.middlePrint(target, player.name + " is now dueling you.");
            Omegga.loadMinigame("onionduel", player.name);
            Omegga.getMinigamePresets
          }
          if(subcommand == 'giveweapon'){
            player.giveItem(args[0]);
            Omegga.middlePrint(player, "Gave weapon " + args[0] + " to player " + player.name);
          }
        }
    });

    const StartDuel = (player1: object, player2: object) => {

    }

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
