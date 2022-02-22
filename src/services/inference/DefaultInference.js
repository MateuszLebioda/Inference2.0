import DependencyService from "../dependency/DependencyService";

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
}

export default DefaultInferenceHelper;
