export class CreditCardPayment {
  creditCardNumber?: string;
  cardHolder?: string;
  expirationDate?: string;
  amount?: string;
  securityCodeCCV?: string;

  constructor(
    creditCardNumber: string,
    cardHolder: string,
    expirationDate: string,
    amount: string,
    securityCodeCCV?: string
  ) {
    this.creditCardNumber = creditCardNumber;
    this.cardHolder = cardHolder;
    this.expirationDate = expirationDate;
    this.amount = amount;
    this.securityCodeCCV = securityCodeCCV;
  }
}
