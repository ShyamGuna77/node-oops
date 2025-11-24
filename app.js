class Bank {
  #balance = 1000;

  deposit(amount) {
    this.#balance += amount;
  }

  getBalance() {
    return this.#balance;
  }
}

const b = new Bank();
b.deposit(200);
b.getBalance();
console.log(b.getBalance());
