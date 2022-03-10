import arrayShuffle from "array-shuffle";
import { RuleMatchingStrategy } from "./RuleMatchingStrategy";

export class RandomMatchingStrategy extends RuleMatchingStrategy {
  matchRules(rules) {
    return arrayShuffle(this.ruleService.copyRulesAndMarkAsNotActive(rules));
  }
}
