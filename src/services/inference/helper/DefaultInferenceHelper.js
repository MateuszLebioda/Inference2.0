import { attributeType } from "../../../model/attribute/AttributeType";
import { operator } from "../../../model/operator/Operator";
import DependencyService from "../../dependency/DependencyService";

class DefaultInferenceHelper {
  getCompleteMetricRule = (rule) => {
    return {
      id: rule.id,
      conditions: rule.conditions.map((c) => this.getCompleteMetricFact(c)),
      conclusion: this.getCompleteMetricFact(rule.conclusion),
    };
  };

  getCompleteMetricFact = (fact) => {
    let completeFact = DependencyService.getCompleteFact(fact);
    return {
      attributeID: completeFact.attributeID,
      value: completeFact.value,
      name: completeFact.attributeName,
      operator: completeFact.operator,
      type: completeFact.type,
    };
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
}

export default DefaultInferenceHelper;
