import { Ccp } from '../model/ccp.model';

export function areCcpItemsComparedEquals(item1: Ccp, item2: Ccp): boolean {
  if (
    item1.id != item2.id ||
    item1.creditCardNumber != item2.creditCardNumber ||
    item1.cardHolder != item2.cardHolder ||
    item1.expirationDate != item2.expirationDate ||
    item1.amount != item2.amount ||
    item1.securityCodeCCV != item2.securityCodeCCV
  ) {
    return false;
  } else return true;
}
