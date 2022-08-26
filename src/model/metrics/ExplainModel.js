import MetricsHelper from "./MetricsHelper";

class ExplainModel {
  constructor(fact, rule, explainModels) {
    const defaultInferenceHelper = new MetricsHelper();
    this.fact = fact
      ? defaultInferenceHelper.getCompleteMetricFact(fact)
      : null;
    this.rule = this.getRule(rule, explainModels);
  }

  getRule(rule, forwardExplainModels) {
    return {
      ruleId: rule ? rule.id : null,
      conditions: forwardExplainModels ? forwardExplainModels : [],
    };
  }
}
export default ExplainModel;
