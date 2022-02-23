import DefaultInferenceHelper from "../helper/DefaultInferenceHelper";

class ExplainModel {
  constructor(fact, rule, explainModels) {
    const defaultInferenceHelper = new DefaultInferenceHelper();
    this.fact = defaultInferenceHelper.getCompleteMetricFact(fact);
    this.rule = this.getRule(rule, explainModels);
  }

  getRule(rule, forwardExplainModels) {
    if (rule) {
      return {
        ruleId: rule.id,
        conditions: forwardExplainModels ? forwardExplainModels : [],
      };
    }
    return null;
  }
}
export default ExplainModel;
