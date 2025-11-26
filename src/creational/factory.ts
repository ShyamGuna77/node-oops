//

interface PaymentGateway {
    pay(amount: number): void;
    borrow(amount: number): void;
    
}

class StripePayment implements PaymentGateway {
  pay(amount: number): void {
    console.log(`Paid ${amount} using Stripe`);
    }
    borrow(amount: number): void {
        console.log(`Borrowed ${amount} using Stripe`);
    }
  
}
class PaypalPayment implements PaymentGateway {
  pay(amount: number): void {
    console.log(`Paid ${amount} using PayPal`);
    }
    borrow(amount: number): void {
        console.log(`Borrowed ${amount} using PayPal`);
    }
}

// Factory method added creating object here
class PaymentFactory {
  static create(type: string): PaymentGateway {
    if (type === "stripe") return new StripePayment();
    if (type === "paypal") return new PaypalPayment();
    throw new Error("Invalid type");
  }
}

const gateway = PaymentFactory.create("stripe");
gateway.pay(1000);
gateway.borrow(200)

const paypalGateway = PaymentFactory.create("paypal");
paypalGateway.pay(500);
paypalGateway.borrow(150);