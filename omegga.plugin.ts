import OmeggaPlugin, { OL, PS, PC } from 'omegga';
import chat from '../omegga/src/omegga/matchers/chat';
import OmeggaPlayer from 'omegga';

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
    let fontSize = 23; //default font size is 18

    this.omegga.on('cmd:a',
    async (speaker: string, ...args: string[]) => {
        if(Omegga.getPlayer(speaker).isHost()){
          const player = this.omegga.getPlayer(speaker);
          player.takeItem
          const message = args.join(' ');
          Omegga.broadcast(`<size="${fontSize}"><color="${player.getNameColor()}"><b>${player.name}</b></color>: ${message}</size>`);
          
        }
      });

      this.omegga.on('cmd:asize',
      async (speaker: string, sizeStr: string) => {
          if(Omegga.getPlayer(speaker).isHost()){
            let newSize = parseInt(sizeStr);
            if(!isNaN(newSize)){
              fontSize = newSize;
              Omegga.whisper(speaker, `Announce font size set to ${newSize}.`);
            }
          }
        });

    //await this.store.set("bar", "e"); 
    //store.set("duelOffers", []);
    this.omegga.on('cmd:onion',
    async (speaker: string, subcommand: string, ...args: string[]) => {
        if(Omegga.getPlayer(speaker).isHost()){
          const player = this.omegga.getPlayer(speaker);
          if(subcommand == 'a'){
            const message = args.join(' ');
            Omegga.broadcast(`<size="100"><color="${player.getNameColor()}">${player.name}</color>: ${message}</size>`);
          }
          else if(subcommand == 'kill') {
            const target = args.join(' ');
            Omegga.middlePrint(player, "Kill command attempted on player " + target);
            Omegga.findPlayerByName(target).kill();
          }
          else if(subcommand == 'mid'){
            const message = args.join(' ');
            MidAll(message);
          }
          else if(subcommand == 'saveenv'){
            const filename = args.join(' ');
            Omegga.saveEnvironment(filename);
          }
          else if(subcommand == 'dmsg'){
            const message = args.join(' ');
            Omegga.saveEnvironment("godarktemp");
            Omegga.loadEnvironment("godark");
            await sleep(1000);
            MidAll(message);
            await sleep(6000);
            Omegga.loadEnvironment("godarktemp");
          }
          else if(subcommand == 'listm'){
            let minis = await Omegga.listMinigames();
            for(const m of minis){
              console.log(`${m.index.toString()} ${m.name}`);
            }
          }
          else if(subcommand == 'savemini'){
            Omegga.saveMinigame(parseInt(args[0]), args[1]);
          }
          else if(subcommand == 'loadmini'){
            Omegga.loadMinigame(args[0], player.id);
          }
          else if(subcommand == 'bootmini'){
            const target = Omegga.findPlayerByName(args[1]);
            let pos = await target.getPosition();

            Omegga.loadMinigame(args[0], target.id);
            let minis = await Omegga.listMinigames();
            for(const m of minis){
              if(m.name == 'temp_todelete' && m.owner.name == target.name){
                console.log(`Deleted minigame ${m.name} at index ${m.index} with owner ${m.owner.name}`);
                Omegga.deleteMinigame(m.index)
              }
            }
            Omegga.writeln(`Chat.Command /TP "${target.name}" ${pos[0].toString()} ${pos[1].toString()} ${pos[2].toString()} 1`)
          }
          else if(subcommand == 'loadminio'){
            const target = Omegga.findPlayerByName(args[1]);
            let pos = await target.getPosition();
            Omegga.middlePrint(player, pos.toString());
            Omegga.loadMinigame(args[0], target.id);
            Omegga.writeln(`Chat.Command /TP "${target.name}" ${pos[0].toString()} ${pos[1].toString()} ${pos[2].toString()} 1`)
          }
          else if(subcommand == 'replacemini'){
            Omegga.deleteMinigame(0);
            Omegga.loadMinigame(args[0], player.id);
          }
          else if(subcommand == 'deletemini'){
            Omegga.deleteMinigame(parseInt(args[0]));
          }
          else if(subcommand == 'duel'){
            const target = Omegga.findPlayerByName(args[0]);
            Omegga.middlePrint(player, "You are now dueling " + target.name);
            //await this.store.set("duel")
            Omegga.middlePrint(target, player.name + " is now dueling you.");
            Omegga.loadMinigame("onionduel", player.name);
            Omegga.getMinigamePresets
          }
          else if(subcommand == 'give'){
            player.giveItem(args[0]);
            Omegga.middlePrint(player, "Gave weapon " + args[0] + " to player " + player.name);
          }
          else if(subcommand == 'e'){
            MidAll("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee<br>eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee<br>eeeeeeeeeeeeeeeeeeeee");
          }
        }
    });

    const MidAll = (message: string) => {
      for(const p of Omegga.players){
        Omegga.middlePrint(p, message);
      }
    }
    
    return { registeredCommands: ['onion', 'a'] };
  }  

  async stop() {
    // Anything that needs to be cleaned up...
  }
}
