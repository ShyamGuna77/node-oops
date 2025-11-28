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
  constructor(coffee: CoffeeMachine, lights: SmartLights, tv: Tv) {
    this.coffee = coffee;
    this.lights = lights;
    this.tv = tv;
  }
  public WakeUp() {
    console.log("--- Waking up with MorinigFacade... ---");
    this.lights.on();
    this.lights.setBrightness(299);
    this.coffee.on();
    this.coffee.brew();1
    this.tv.on();
    this.tv.setChannel(7);
  }
}

const coffee = new CoffeeMachine();
const lights = new SmartLights();
const tv = new Tv();


const morning = new MorinigFacade(coffee, lights, tv);

morning.WakeUp();
