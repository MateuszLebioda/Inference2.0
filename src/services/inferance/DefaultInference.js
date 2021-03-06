import { attributeType } from "../../model/attribute/AttributeType";
import operator from "../../model/operator/Operator";

class DefaultInference {
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

export default DefaultInference;
