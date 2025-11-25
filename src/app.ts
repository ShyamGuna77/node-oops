interface PaymentGateway {
    pay(amount: number): Promise<boolean>;
    refund(txId: string): Promise<boolean>;
  }
  
class StripePayment implements PaymentGateway {
    async pay(amount: number): Promise<boolean> {
      console.log("Stripe processing:", amount);
      return true;
    }
    async refund(txId: string): Promise<boolean> {
      console.log("Stripe refund:", txId);
      return true;
    }
  }
  
  class RazorpayPayment implements PaymentGateway {
    async pay(amount: number): Promise<boolean> {
      console.log("Razorpay handling:", amount);
      return true;
    }
    async refund(txId: string): Promise<boolean> {
      console.log("Razorpay refund:", txId);
      return true;
    }
  }
  

  class CheckoutService {
    constructor(private gateway: PaymentGateway) {}

    async processOrder(amount: number) {
      return this.gateway.pay(amount);
    }
  }
  
  const checkout1 = new CheckoutService(new StripePayment());
  checkout1.processOrder(500);

  const checkout2 = new CheckoutService(new RazorpayPayment());
  checkout2.processOrder(500);
