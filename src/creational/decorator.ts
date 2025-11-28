


// ==========================================
// STEP 1: THE RULES (Interface)
// ==========================================
// Every pizza (plain or fancy) MUST be able to do these two things.
interface IPizza {
  getDescription(): string;
  getCost(): number;
}

// ==========================================
// STEP 2: THE BASE ITEM (The Naked Object)
// ==========================================
// This is just a basic dough and tomato sauce pizza.
class PlainPizza implements IPizza {
  getDescription(): string {
    return "Plain Pizza";
  }

  getCost(): number {
    return 10; // Base price
  }
}

// ==========================================
// STEP 3: THE BLUEPRINT FOR DECORATORS
// ==========================================
// This class is the "Wrapper". It holds a pizza inside it.
// It doesn't add toppings itself, but it teaches sub-classes how to act.
abstract class PizzaDecorator implements IPizza {
  // The 'protected' keyword means sub-classes can see this variable.
  constructor(protected pizzaInside: IPizza) {}

  getDescription(): string {
    // Just ask the pizza inside what it is
    return this.pizzaInside.getDescription();
  }

  getCost(): number {
    // Just ask the pizza inside how much it costs
    return this.pizzaInside.getCost();
  }
}

// ==========================================
// STEP 4: THE REAL DECORATORS (Toppings)
// ==========================================

// 🧀 Adds Cheese
class Cheese extends PizzaDecorator {
  getCost(): number {
    // 1. Get cost of the pizza below me
    const costBelow = super.getCost(); 
    // 2. Add my price ($2)
    return costBelow + 2;
  }

  getDescription(): string {
    // 1. Get description of pizza below me
    const descBelow = super.getDescription();
    // 2. Add my name
    return descBelow + ", Extra Cheese";
  }
}

// 🍕 Adds Pepperoni
class Pepperoni extends PizzaDecorator {
  getCost(): number {
    return super.getCost() + 5; // Adds $5
  }

  getDescription(): string {
    return super.getDescription() + ", Pepperoni";
  }
}

// 🍄 Adds Mushrooms
class Mushroom extends PizzaDecorator {
  getCost(): number {
    return super.getCost() + 3; // Adds $3
  }

  getDescription(): string {
    return super.getDescription() + ", Mushroom";
  }
}

// ==========================================
// STEP 5: USAGE (Making the Pizza)
// ==========================================

console.log("--- Order 1: Just Plain ---");
const myLunch = new PlainPizza();
console.log(`${myLunch.getDescription()} = $${myLunch.getCost()}`);


console.log("\n--- Order 2: Cheese Pizza ---");
// We wrap the PlainPizza inside the Cheese
const cheesePizza = new Cheese(new PlainPizza());
console.log(`${cheesePizza.getDescription()} = $${cheesePizza.getCost()}`);


console.log("\n--- Order 3: The 'Mega' Pizza ---");
// We wrap Plain -> in Cheese -> in Pepperoni -> in Mushroom
// It looks like an onion!
let megaPizza: IPizza = new PlainPizza(); // $10
megaPizza = new Cheese(megaPizza);        // +$2
megaPizza = new Pepperoni(megaPizza);     // +$5
megaPizza = new Mushroom(megaPizza);      // +$3

console.log(`${megaPizza.getDescription()} = $${megaPizza.getCost()}`);
// Output: Plain Pizza, Extra Cheese, Pepperoni, Mushroom = $20