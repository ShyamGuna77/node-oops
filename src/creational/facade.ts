// --- THE TOOLS (Existing Classes) ---
class CoffeeMachine {
  on() {
    console.log("☕ Heating water...");
  }
  brew() {
    console.log("☕ Brewing coffee...");
  }
}

class SmartLights {
  on() {
    console.log("💡 Lights are ON");
  }
  setBrightness(level: number) {
    console.log(`💡 Brightness set to ${level}`);
  }
}

class Tv {
  on() {
    console.log("📺 TV is ON");
  }
  setChannel(ch: number) {
    console.log(`📺 Channel set to ${ch}`);
  }
}

class MorinigFacade {
  private coffee: CoffeeMachine;
  private lights: SmartLights;
  private tv: Tv;
  constructor() {
    this.coffee = new CoffeeMachine();
    this.lights = new SmartLights();
    this.tv = new Tv();
  }
  public WakeUp() {
    console.log("--- Waking up with MorinigFacade... ---");
    this.lights.on();
    this.lights.setBrightness(299);
    this.coffee.on();
    this.coffee.brew();
    this.tv.on();
    this.tv.setChannel(7);
  }
}


const morning = new MorinigFacade();

morning.WakeUp();
