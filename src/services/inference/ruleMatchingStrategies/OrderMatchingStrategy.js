import { RuleMatchingStrategy } from "./RuleMatchingStrategy";

export class OrderMatchingStrategy extends RuleMatchingStrategy {
  matchRulesImplementation(rules) {
    return this.ruleService.copyRules(rules);
  }
}
