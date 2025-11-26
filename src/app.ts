interface Iswitchable {
  turnOn(): void;
  turnOff(): void;
}

interface IDimmable {
  setBrightness(level: number): void;
}

interface ISensor {
  getReading(): number | string;
}

interface IVideoRecorder {
  record(): void;
}

class ArloCamera implements Iswitchable, IVideoRecorder {
  private isArmed: boolean = false;

  turnOn(): void {
    this.isArmed = true;
    console.log("📹 Camera: ARMED and watching.");
  }

  turnOff(): void {
    this.isArmed = false;
    console.log("📹 Camera: Disarmed.");
  }

  record(): void {
    if (this.isArmed) {
      console.log("🔴 Camera: Recording video clip...");
    } else {
      console.log("⚪ Camera: Cannot record, system is disarmed.");
    }
  }
}

class HueMotionSensor implements ISensor {
  private status: "Movement" | "Still";

  constructor(status: "Movement" | "Still") {
    this.status = status;
  }

  // Simulation method to change state
  detectMovement() {
    this.status = "Movement";
  }
  stopMovement() {
    this.status = "Still";
  }

  getReading(): "Movement" | "Still" {
    return this.status;
  }
}
class PhilipsHueLight implements Iswitchable, IDimmable {
  private brightness: number = 100;
  private isOn: boolean = false;

  turnOn(): void {
    this.isOn = true;
    console.log("Philips Hue Light is turned ON");
  }
  turnOff(): void {
    this.isOn = false;
    console.log("Philips Hue Light is turned OFF");
  }

  setBrightness(level: number): void {
    this.brightness = level;
    console.log(`Philip brightness level is ${this.brightness}`);
  }
}

class GenericOutlet implements Iswitchable {
  turnOn(): void {
    console.log("🔌 Smart Plug: Power flowing");
  }

  turnOff(): void {
    console.log("🔌 Smart Plug: Power cut");
  }
}

class NesThermostat implements Iswitchable, ISensor {
  private temperature: number = 22;

  turnOn(): void {
    console.log("🌡️ Thermostat is ON");
  }

  turnOff(): void {
    console.log("🌡️ Thermostat is OFF");
  }

  getReading(): number {
    return this.temperature;
  }
}

class SmartHomeController {
  private devices: Iswitchable[];

  constructor(devices: Iswitchable[]) {
    this.devices = devices;
  }

  turnEverythingOn() {
    console.log("\n--- Master Command: Wake Up ---");
    this.devices.forEach((device) => {
      device.turnOn();
    });
  }

  turnEverythingOff() {
    console.log("\n--- Master Command: Sleep Mode ---");
    this.devices.forEach((device) => {
      device.turnOff();
    });
  }
}

class AutomationMaster {

  private sensors: ISensor[];
  private devices: Iswitchable[];

  constructor(sensors: ISensor[], devices: Iswitchable[]) {
    this.sensors = sensors;
    this.devices = devices;
  }

  public runChecks() {
    console.log("\n--- 🤖 Automation: Running System Checks ---");

    this.sensors.forEach((sensor) => {
      const reading = sensor.getReading();

      // LOGIC: If movement is detected, turn on the lights!
      if (reading === "Movement") {
        console.log("🚨 MOTION DETECTED! Triggering Alarm Protocol...");
        this.triggerAlarm();
      } else {
        console.log(`Sensor Status: ${reading} (Normal)`);
      }
    });
  }

  private triggerAlarm() {
    this.devices.forEach((device) => {
      device.turnOn();
      // Check if this specific device is a Recorder (Type Guard)
      if (this.isVideoRecorder(device)) {
        device.record();
      }
    });
  }

  private isVideoRecorder(device: any): device is IVideoRecorder {
    return (device as IVideoRecorder).record !== undefined;
  }
}

// 1. Create our diverse devices
const livingRoomLight = new PhilipsHueLight();
const coffeeMaker = new GenericOutlet();

const myHub = new SmartHomeController([livingRoomLight, coffeeMaker]);

myHub.turnEverythingOn();

livingRoomLight.setBrightness(50);
console.log(`Current Temperature: ${new NesThermostat().getReading()}°C`);

myHub.turnEverythingOff();
// 1. Instantiate Devices
const kitchenLight = new PhilipsHueLight();
const frontDoorCam = new ArloCamera();
const hallwayMotion = new HueMotionSensor("Still");
const movementSensor = new HueMotionSensor("Movement");

const remote = new SmartHomeController([kitchenLight, frontDoorCam]);

const bot = new AutomationMaster([hallwayMotion], [kitchenLight, frontDoorCam]);
movementSensor.detectMovement();
remote.turnEverythingOn();

console.log("\n(Intruder enters hallway...)");
hallwayMotion.detectMovement();

bot.runChecks();
