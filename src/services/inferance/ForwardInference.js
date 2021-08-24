import FactService from "../../model/fact/FactService";
import RuleService from "../../model/rule/RuleService";
import DefaultInference from "./DefaultInference";

class ForwardInference extends DefaultInference {
  ruleService = new RuleService();
  factService = new FactService();

  inference = (facts, rules) => {
    let newFacts = [...facts];
    let inferenceRules = this.ruleService.copyRulesAndMarkAsNotActive(rules);

    let newFact;

    while ((newFact = this.findNewFact(newFacts, inferenceRules))) {
      if (!newFacts.find((nf) => this.factService.equals(nf, newFact))) {
        newFacts.push(newFact);
      }
    }

    return newFacts;
  };

  findNewFact = (facts, rules) => {
    for (let r of rules) {
      if (!r.activated) {
        let isRequirementsMet = true;
        for (let c of r.conditions) {
          let isConditionRequirementsMet = false;
          for (let f of facts) {
            if (this.isRequirementsMet(f, c)) {
              isConditionRequirementsMet = true;
              break;
            }
          }
          if (!isConditionRequirementsMet) {
            isRequirementsMet = false;
            break;
          }
        }
        if (isRequirementsMet) {
          r.activated = true;
          return r.conclusion;
        }
      }
    }
  };
}

export default ForwardInference;
