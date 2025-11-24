class Account {
  #balance = 0;

  constructor(name) {
    this.name = name;
  }

  deposit(amount) {
    this.#validate(amount);
    this.#balance += amount;
  }

  withdraw(amount) {
    this.#validate(amount);
    if (amount > this.#balance) throw new Error("Not enough funds");
    this.#balance -= amount;
  }

  #validate(amount) {
    if (amount <= 0) throw new Error("Invalid amount");
  }

  getBalance() {
    return this.#balance;
  }
}

class PremiumAccount extends Account {
  deposit(amount) {
    super.deposit(amount + 100); // bonus
  }
}

const acc = new PremiumAccount("Sinister");
const newAcc = new Account("Basic");
newAcc.deposit(300);
newAcc.withdraw(300);
console.log(newAcc.getBalance()); 
acc.deposit(500);
console.log(acc.getBalance()); // 600
acc.withdraw(200);
console.log(acc.getBalance()); // 400
