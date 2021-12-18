/* eslint-disable no-loop-func */
import FactService from "../../model/fact/FactService";
import RuleService from "../../model/rule/RuleService";
import DefaultInference from "./DefaultInference";
import store from "../../store";

class ForwardInference extends DefaultInference {
  ruleService = new RuleService();
  factService = new FactService();

  metrics = this.getMetricsObject;

  inference = (rules = null, facts = null) => {
    this.metrics = this.getMetricsObject;
    let inferenceRules = this.ruleService.copyRulesAndMarkAsNotActive(
      rules ? rules : [...store.getState().file.value.rules]
    );

    this.metrics = {
      ...this.metrics,
      oldFacts: facts ? [...facts] : [...store.getState().file.value.facts],
    };

    let newFact;
    this.metrics = { ...this.metrics, timeStart: performance.now() };

    while (
      (newFact = this.findNewFact(this.metrics.getAllFacts(), inferenceRules))
    ) {
      this.metrics = {
        ...this.metrics,
        iterations: this.metrics.iterations + 1,
      };

      if (
        !this.metrics
          .getAllFacts()
          .some((nf) => this.factService.equals(nf, newFact))
      ) {
        this.metrics = {
          ...this.metrics,
          newFacts: [...this.metrics.newFacts, ...[newFact]],
        };
      }
    }

    this.metrics = { ...this.metrics, timeEnd: performance.now() };
    return this.metrics;
  };

  findNewFact = (facts, rules) => {
    for (let r of rules) {
      this.metrics = {
        ...this.metrics,
        checkedRules: this.metrics.checkedRules + 1,
      };
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
          this.metrics = {
            ...this.metrics,
            activatedRules: [...this.metrics.activatedRules, ...[r]],
          };
          r.activated = true;
          return r.conclusion;
        }
      }
    }
  };
}

export default ForwardInference;
