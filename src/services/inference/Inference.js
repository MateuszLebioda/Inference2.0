import { attributeType } from "../../model/attribute/AttributeType";
import FactService from "../../model/fact/FactService";
import { operator } from "../../model/operator/Operator";
import RuleService from "../../model/rule/RuleService";
import store from "../../store";

export class Inference {
  ruleService = new RuleService();
  factService = new FactService();

  metrics;

  inferenceRules = [];

  inference = (metric) => {
    this.metrics = metric;
    this.metrics.startCountingTime();
    this.inferenceRules = this.prepareInferenceRules();
    this.inferenceImplementation();
    this.metrics.endCountingTime();
    return Promise.resolve(this.metrics);
  };

  inferenceImplementation = () => {
    throw new Error("Inference method is not implemented!");
  };

  isRequirementsMet = (fact, condition) => {
    if (fact.attributeID === condition.attributeID) {
      if (fact.type === attributeType.CONTINOUS) {
        return this.isRequirementsMetToContinousType(fact, condition);
      } else {
        return this.isRequirementsMetToSymbolicType(fact, condition);
      }
    }
    return false;
  };

  isRequirementsMetToContinousType = (fact, conclusion) => {
    let factValue = Number(fact.value);
    let conclusionValue = Number(conclusion.value);
    switch (conclusion.operator) {
      case operator.LESS_THEN:
        return factValue < conclusionValue;
      case operator.LESS_EQUALS:
        return factValue <= conclusionValue;
      case operator.GREATER_THEN:
        return factValue > conclusionValue;
      case operator.GREATER_EQUALS:
        return factValue <= conclusionValue;
      case operator.EQUALS:
        return factValue === conclusionValue;
      case operator.NOT_EQUALS:
        return factValue !== conclusionValue;
      default:
        return false;
    }
  };

  isRequirementsMetToSymbolicType = (fact, conclusion) => {
    return fact.value === conclusion.value;
  };

  prepareInferenceRules = () => {
    let inferenceRules = this.ruleService.copyRulesAndMarkAsNotActive([
      ...store.getState().file.value.rules,
    ]);

    return this.metrics.matchingStrategy.implementation.matchRulesForward(
      inferenceRules
    );
  };
}
