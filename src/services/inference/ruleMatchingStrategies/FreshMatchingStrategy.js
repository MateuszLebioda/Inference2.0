import { OrderMatchingStrategy } from "./OrderMatchingStrategy";

export class FreshMatchingStrategy extends OrderMatchingStrategy {
  matchRulesImplementation(rules) {
    return super.matchRulesImplementation(rules).reverse();
  }
}
