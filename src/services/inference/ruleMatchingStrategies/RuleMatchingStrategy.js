import RuleService from "../../../model/rule/RuleService";
import store from "../../../store";

export class RuleMatchingStrategy {
  ruleService = new RuleService();

  matchRulesForward() {
    return this.matchRules([...store.getState().file.value.rules]);
  }

  matchRulesBackward(rules) {
    return this.matchRules(rules);
  }

  matchRules(rules) {
    throw new Error("matchRules method is not implemented!");
  }
}
