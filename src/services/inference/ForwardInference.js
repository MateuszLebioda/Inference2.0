/* eslint-disable no-loop-func */
import FactService from "../../model/fact/FactService";
import RuleService from "../../model/rule/RuleService";
import DefaultInference from "./DefaultInference";
import store from "../../store";
import ForwardInferenceHelper from "./forward/ForwardInferenceHelper";

class ForwardInference extends DefaultInference {
  ruleService = new RuleService();
  factService = new FactService();

  metrics;

  forwardInferenceHelper = new ForwardInferenceHelper();

  inference = (metric) => {
    this.metrics = metric;
    let inferenceRules = this.ruleService.copyRulesAndMarkAsNotActive([
      ...store.getState().file.value.rules,
    ]);
    this.metrics.startCountingTime();

    let activatedRule;

    while (
      (activatedRule = this.findNewFact(
        this.metrics.getAllFactExplainModels(),
        inferenceRules
      ))
    ) {
      if (
        !this.metrics
          .getAllFacts()
          .some((fact) =>
            this.factService.equals(fact, activatedRule[0].conclusion)
          )
      ) {
        this.metrics.addNewFactExplainModel(activatedRule[0], activatedRule[1]);
      }
    }

    this.metrics.endCountingTime();
    return Promise.resolve(this.metrics);
  };

  findNewFact = (factsExplainMethod, rules) => {
    this.metrics.incrementIterations();
    for (let r of rules) {
      this.metrics.incrementCheckedRules();
      if (!r.activated) {
        let [isRequirementsMet, factExplainArr] =
          this.forwardInferenceHelper.isRulesConditionsMet(
            r,
            factsExplainMethod
          );
        if (isRequirementsMet) {
          this.metrics.addActivatedRule(r);
          r.activated = true;
          return [r, factExplainArr];
        }
      }
    }
  };
}

export default ForwardInference;
