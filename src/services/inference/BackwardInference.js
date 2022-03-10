import ExplainModel from "../../model/metrics/ExplainModel";
import { Inference } from "./Inference";

export class BackwardInference extends Inference {
  inferenceImplementation = () => {
    let goalProve = this.proveFact(this.metrics.goal);
    if (goalProve) {
      this.metrics.newFacts.push(goalProve.proves);
    }
  };

  proveFact = (fact, explainModel) => {
    if (!explainModel) {
      explainModel = new ExplainModel(fact);
    }
    let indirectHypotheses = this.findIndirectHypotheses(fact);
    for (let indirectHypothesis of indirectHypotheses) {
      this.metrics.addIndirectHypothesis(indirectHypothesis);
      let indirectHypothesesProve = this.prove(indirectHypothesis);
      if (indirectHypothesesProve.proved) {
        explainModel.rule.conditions.push(indirectHypothesesProve.proves);
        this.metrics.addActivatedRule(indirectHypothesis);
        return indirectHypothesesProve;
      }
    }
  };

  prove = (hypothesis) => {
    let explainModel = new ExplainModel(hypothesis.conclusion, hypothesis);
    for (let condition of hypothesis.conditions) {
      let conditionProveFact = this.findConditionProve(condition);
      if (conditionProveFact) {
        explainModel.rule.conditions.push(new ExplainModel(conditionProveFact));
      } else {
        let isHypothesisProve = this.proveFact(condition, explainModel);
        if (!isHypothesisProve) {
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

  findIndirectHypotheses = (conclusion) => {
    let indirectHypotheses = this.inferenceRules.filter(
      (r) =>
        r.conclusion.attributeID === conclusion.attributeID &&
        r.conclusion.value === conclusion.value
    );

    return this.metrics.matchingStrategy.implementation.matchRulesBackward(
      indirectHypotheses
    );
  };

  findConditionProve = (condition) => {
    return this.metrics.startFacts
      .map((sf) => sf.fact)
      .find((f) => this.isRequirementsMet(f, condition));
  };
}
