/* eslint-disable no-loop-func */
import FactService from "../../model/fact/FactService";
import RuleService from "../../model/rule/RuleService";
import DefaultInference from "./DefaultInference";
import store from "../../store";
import { Metrics } from "../../model/metrics/Metrics";

class ForwardInference extends DefaultInference {
  ruleService = new RuleService();
  factService = new FactService();

  metrics = new Metrics();

  inference = (metric, facts = null, rules = null) => {
    this.metrics = metric;
    let inferenceRules = this.ruleService.copyRulesAndMarkAsNotActive(
      rules ? rules : [...store.getState().file.value.rules]
    );
    this.metrics.setOldFacts(
      facts ? [...facts] : [...store.getState().file.value.facts]
    );
    this.metrics.startCountingTime();

    let newFact;

    while (
      (newFact = this.findNewFact(this.metrics.getAllFacts(), inferenceRules))
    ) {
      if (
        !this.metrics
          .getAllFacts()
          .some((nf) => this.factService.equals(nf, newFact))
      ) {
        this.metrics.addNewFact(newFact);
      }
    }

    this.metrics.endCountingTime();
    return Promise.resolve(this.metrics);
  };

  findNewFact = (facts, rules) => {
    this.metrics.incrementIterations();
    for (let r of rules) {
      this.metrics.incrementCheckedRules();
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
          this.metrics.addActivatedRule(r);
          r.activated = true;
          return r.conclusion;
        }
      }
    }
  };
}

export default ForwardInference;
