import RuleService from "../../../model/rule/RuleService";

export class RuleMatchingStrategy {
  ruleService = new RuleService();

  matchRules(rules) {
    return this.matchRulesImplementation(rules);
  }

  matchRulesImplementation(rules) {
    throw new Error("matchRules method is not implemented!");
  }
}
