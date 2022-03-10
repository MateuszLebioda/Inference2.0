import { RuleMatchingStrategy } from "./RuleMatchingStrategy";

export class SpecificityMatchingStrategy extends RuleMatchingStrategy {
  matchRules(rules) {
    return this.ruleService
      .copyRulesAndMarkAsNotActive(rules)
      .sort((r1, r2) => this.compare(r1, r2));
  }

  compare(rule1, rule2) {
    if (rule1.conditions.length > rule2.conditions.length) {
      return -1;
    } else if (rule1.conditions.length < rule2.conditions.length) {
      return 1;
    }
    return 0;
  }
}
