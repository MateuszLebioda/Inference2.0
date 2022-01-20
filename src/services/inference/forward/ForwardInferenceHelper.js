import { attributeType } from "../../../model/attribute/AttributeType";
import { operator } from "../../../model/operator/Operator";

class ForwardInferenceHelper {
  isRulesConditionsMet = (rule, factsExplainModels) => {
    let isRequirementsMet = true;
    let factExplainArr = [];
    for (let c of rule.conditions) {
      let isConditionRequirementsMet = false;
      for (let f of factsExplainModels) {
        if (this.isRequirementsMet(f.fact, c)) {
          isConditionRequirementsMet = true;
          factExplainArr.push(f);
          break;
        }
      }
      if (!isConditionRequirementsMet) {
        isRequirementsMet = false;
        break;
      }
    }
    return [isRequirementsMet, factExplainArr];
  };

  isRequirementsMet = (fact, conclusion) => {
    if (fact.attributeID === conclusion.attributeID) {
      if (fact.type === attributeType.CONTINOUS) {
        return this.isRequirementsMetToContinousType(fact, conclusion);
      } else {
        return this.isRequirementsMetToSymbolicType(fact, conclusion);
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

export default ForwardInferenceHelper;
