import FactService from "../../model/fact/FactService";
import RuleService from "../../model/rule/RuleService";
import { BackwardInferenceHelper } from "./backward/BackwardInferenceHelper";
import ExplainModel from "./forward/ExplainModel";
import DefaultInferenceHelper from "./helper/DefaultInferenceHelper";

export class BackwardInference extends DefaultInferenceHelper {
  ruleService = new RuleService();
  factService = new FactService();

  metrics;

  backwardInferenceHelper = new BackwardInferenceHelper();

  inference = (metric) => {
    this.metrics = metric;
    this.metrics.startCountingTime();

    let indirectHypotheses =
      this.backwardInferenceHelper.findRulesPossibleToActivate(metric.goal);

    for (let indirectHypothesis of indirectHypotheses) {
      let indirectHypothesesProve = this.prove(indirectHypothesis);
      this.metrics.addIndirectHypothesis(indirectHypothesis);
      if (indirectHypothesesProve.proved) {
        metric.newFacts.push(indirectHypothesesProve.proves);
        this.metrics.addActivatedRule(indirectHypothesis);
        break;
      }
    }

    this.metrics.endCountingTime();
    return Promise.resolve(this.metrics);
  };

  prove = (hypothesis) => {
    let explainModel = new ExplainModel(hypothesis.conclusion, hypothesis);
    for (let condition of hypothesis.conditions) {
      let conditionProveFact =
        this.backwardInferenceHelper.findConditionProve(condition);
      if (conditionProveFact) {
        explainModel.rule.conditions.push(new ExplainModel(conditionProveFact));
      } else {
        let indirectHypotheses =
          this.backwardInferenceHelper.findRulesPossibleToActivate(condition);
        let isHypothesisProved = false;
        for (let indirectHypothesis of indirectHypotheses) {
          this.metrics.addIndirectHypothesis(indirectHypothesis);
          let indirectHypothesesProve = this.prove(indirectHypothesis);
          if (indirectHypothesesProve.proved) {
            explainModel.rule.conditions.push(indirectHypothesesProve.proves);
            this.metrics.addActivatedRule(indirectHypothesis);
            isHypothesisProved = true;
          }
        }
        if (!isHypothesisProved) {
          return this.getProveObject();
        }
      }
    }
    return this.getProveObject(explainModel);
  };

  getProveObject = (explainModel) => {
    return {
      proved: explainModel ? true : false,
      proves: explainModel ? explainModel : [],
    };
  };
}
