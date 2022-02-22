/* eslint-disable no-loop-func */
import FactService from "../../model/fact/FactService";
import RuleService from "../../model/rule/RuleService";
import DefaultInferenceHelper from "./DefaultInference";
import store from "../../store";
import ForwardInferenceHelper from "./forward/ForwardInferenceHelper";

class ForwardInference extends DefaultInferenceHelper {
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
      this.metrics.addActivatedRule(
        this.forwardInferenceHelper.getCompleteMetricRule(activatedRule.rule)
      );
      if (
        !this.metrics
          .getAllFacts()
          .some((fact) =>
            this.factService.equals(fact, activatedRule.rule.conclusion)
          )
      ) {
        this.metrics.addNewFactExplainModel(
          activatedRule.rule,
          activatedRule.newFactsExplainMethod
        );
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
        let newFactsExplainMethod =
          this.forwardInferenceHelper.isRulesConditionsMet(
            r,
            factsExplainMethod
          );
        if (newFactsExplainMethod.length > 0) {
          r.activated = true;
          return {
            rule: r,
            newFactsExplainMethod: newFactsExplainMethod,
          };
        }
      }
    }
  };
}

export default ForwardInference;
