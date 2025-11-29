interface ISubscriber {
  update(videoTitle: string): void;
}

class YouTubeChannel {
  // The list of fans (Observers)
  private subscribers: ISubscriber[] = [];

  // 1. Add a fan to the list
  subscribe(sub: ISubscriber) {
    this.subscribers.push(sub);
  }

  // 2. Remove a fan (Unsubscribe)
  unsubscribe(sub: ISubscriber) {
    this.subscribers = this.subscribers.filter((s) => s !== sub);
  }

  // 3. The "Upload" event
  uploadVideo(title: string) {
    console.log(`\n🎥 Channel: Uploading new video "${title}"...`);

    // THE MAGIC: Notify everyone automatically!
    this.notifySubscribers(title);
  }

  private notifySubscribers(title: string) {
    this.subscribers.forEach((sub) => {
      sub.update(title); // Call the phone of every fan
    });
  }
}

class User implements ISubscriber {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  update(videoTitle: string): void {
    console.log(
      `🔔 Notification for ${this.name}: New video uploaded - "${videoTitle}"`
    );
  }
}

// 1. Create the Channel
const mrBeast = new YouTubeChannel();

const alice = new User("Alice");
const bob = new User("Bob");

mrBeast.subscribe(alice);
mrBeast.subscribe(bob);

mrBeast.uploadVideo("I Gave Away $1,000,000!");

console.log("\n(Bob unsubscribed)");
mrBeast.unsubscribe(bob);

mrBeast.uploadVideo("Extreme Hide and Seek!");
