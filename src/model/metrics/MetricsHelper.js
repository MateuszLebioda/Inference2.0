import FactService from "../fact/FactService";
import DependencyService from "../../services/dependency/DependencyService";

class MetricsHelper {
  factService = new FactService();

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

  factAlreadyExist = (facts, conclusion) => {
    return facts.some((fact) => this.factService.equals(fact, conclusion));
  };
}

export default MetricsHelper;
