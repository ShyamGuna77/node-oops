

// 1. The Target Interface (What your store expects)
interface IPaymentProcessor {
  pay(amount: number): void;
}

// 2. The Old/Existing Class (PayPal)
// It already works with the interface naturally.
class PayPalProcessor implements IPaymentProcessor {
  pay(amount: number): void {
    console.log(`✅ PayPal: Paid $${amount}`);
  }
}

// 3. The New/Incompatible Class (Stripe)
// It has different method names ('makeTransaction' instead of 'pay')
// and expects currency as a separate argument.
class StripeSDK {
  makeTransaction(currency: string, total: number): void {
    console.log(`✅ Stripe: Processed ${total} ${currency}`);
  }
}

// 4. The Adapter (The Middleman)
// It looks like IPaymentProcessor on the outside, but talks to StripeSDK inside.
class StripeAdapter implements IPaymentProcessor {
  private stripe: StripeSDK;

  constructor(stripe: StripeSDK) {
    this.stripe = stripe;
  }

  pay(amount: number): void {
    // We transform the call to match what Stripe needs
    this.stripe.makeTransaction("USD", amount);
  }
}


class Razorpay {
  makePayment(amount: number): void {
    console.log(`✅ Razorpay: Paid ₹${amount}`);
  }
}

class RazorpaySdk implements IPaymentProcessor {
     private razorpay: Razorpay;

  constructor(razorpay: Razorpay) {
    this.razorpay = razorpay;
  }
  pay(amount: number): void {
    this.razorpay.makePayment(amount);
  }
}
// --- USAGE ---

// Your Store Code (It only knows about IPaymentProcessor)
function processStorePayment(processor: IPaymentProcessor, price: number) {
  processor.pay(price);
}

const paypal = new PayPalProcessor();
const stripe = new StripeSDK();
const stripeAdapter = new StripeAdapter(stripe); // Wrap Stripe in the Adapter

const razorpay = new Razorpay();
const razorpayAdapter = new RazorpaySdk(razorpay);

console.log("--- Customer 1 (PayPal) ---");
processStorePayment(paypal, 50); 
// Output: ✅ PayPal: Paid $50

console.log("\n--- Customer 2 (Stripe) ---");
// The store treats the adapter exactly like it treats PayPal
processStorePayment(stripeAdapter, 50); 

console.log("\n--- Customer 3 (Razorpay) ---");
processStorePayment(razorpayAdapter, 4000); 
