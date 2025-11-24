class User {
  constructor(name) {
    this.name = name;
  }

  greet() {
    console.log("Hello", this.name);
  }
}

const u = new User("Sinister");
u.greet(); // Hello Sinister
