import { OrderMatchingStrategy } from "./OrderMatchingStrategy";

export class FreshMatchingStrategy extends OrderMatchingStrategy {
  matchRules(rules) {
    return super.matchRules(rules).reverse();
  }
}
