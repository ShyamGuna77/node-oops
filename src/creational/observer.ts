// interface ISubscriber {
//   update(videoTitle: string): void;
// }

// class YouTubeChannel {
//   // The list of fans (Observers)
//   private subscribers: ISubscriber[] = [];

//   // 1. Add a fan to the list
//   subscribe(sub: ISubscriber) {
//     this.subscribers.push(sub);
//   }

//   // 2. Remove a fan (Unsubscribe)
//   unsubscribe(sub: ISubscriber) {
//     this.subscribers = this.subscribers.filter((s) => s !== sub);
//   }

//   // 3. The "Upload" event
//   uploadVideo(title: string) {
//     console.log(`\n🎥 Channel: Uploading new video "${title}"...`);

//     // THE MAGIC: Notify everyone automatically!
//     this.notifySubscribers(title);
//   }

//   private notifySubscribers(title: string) {
//     this.subscribers.forEach((sub) => {
//       sub.update(title); // Call the phone of every fan
//     });
//   }
// }

// class User implements ISubscriber {
//   private name: string;

//   constructor(name: string) {
//     this.name = name;
//   }

//   update(videoTitle: string): void {
//     console.log(
//       `🔔 Notification for ${this.name}: New video uploaded - "${videoTitle}"`
//     );
//   }
// }

// // 1. Create the Channel
// const mrBeast = new YouTubeChannel();

// const alice = new User("Alice");
// const bob = new User("Bob");

// mrBeast.subscribe(alice);
// mrBeast.subscribe(bob);

// mrBeast.uploadVideo("I Gave Away $1,000,000!");

// console.log("\n(Bob unsubscribed)");
// mrBeast.unsubscribe(bob);

// mrBeast.uploadVideo("Extreme Hide and Seek!");


interface IWeatherObserver {
  updateWeather(temp: number, humidity: number): void;
}

class WeatherStation {
  private observers: IWeatherObserver[] = [];

  subscribe(obs: IWeatherObserver) {
    this.observers.push(obs);
  }

  unsubscribe(obs: IWeatherObserver) {
    this.observers = this.observers.filter((o) => o !== obs);
  }

  // When weather changes → notify all observers
  setWeather(temp: number, humidity: number) {
    console.log(`Weather updated: Temp=${temp}, Humidity=${humidity}`);

    this.observers.forEach((obs) => {
      obs.updateWeather(temp, humidity);
    });
  }
}

class WeatherApp implements IWeatherObserver {
  updateWeather(temp: number, humidity: number): void {
    console.log(`🌤️ Weather App: Temperature is ${temp}°C`);
  }
}

class NewsApp implements IWeatherObserver {
  updateWeather(temp: number, humidity: number): void {
    console.log(`📰 News App: Weather changed! Temp=${temp}°C`);
  }
}


class AgricultureApp implements IWeatherObserver {
  updateWeather(temp: number, humidity: number): void {
    console.log(`🌾 Agriculture App: Humidity is ${humidity}%`);
  }
}


const station = new WeatherStation();

const weatherApp = new WeatherApp();
const agriApp = new AgricultureApp();
const newsApp = new NewsApp();

// Apps subscribe
station.subscribe(weatherApp);
station.subscribe(agriApp);
station.subscribe(newsApp);

// Weather Update
station.setWeather(32, 60);

// Unsubscribe one app
station.unsubscribe(newsApp);

// Another weather update
station.setWeather(28, 70);
