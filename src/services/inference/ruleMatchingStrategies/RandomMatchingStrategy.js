import arrayShuffle from "array-shuffle";
import { RuleMatchingStrategy } from "./RuleMatchingStrategy";

export class RandomMatchingStrategy extends RuleMatchingStrategy {
  matchRulesImplementation(rules) {
    return arrayShuffle(this.ruleService.copyRules(rules));
  }
}
