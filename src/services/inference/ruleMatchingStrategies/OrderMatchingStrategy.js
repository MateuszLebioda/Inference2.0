import { RuleMatchingStrategy } from "./RuleMatchingStrategy";

export class OrderMatchingStrategy extends RuleMatchingStrategy {
  matchRules(rules) {
    return this.ruleService.copyRulesAndMarkAsNotActive(rules);
  }
}
