import DefaultInferenceHelper from "../DefaultInference";

class ForwardExplainModel {
  constructor(fact, rule, forwardExplainModels) {
    const defaultInferenceHelper = new DefaultInferenceHelper();
    this.fact = defaultInferenceHelper.getCompleteMetricFact(fact);
    this.rule =
      rule && forwardExplainModels
        ? {
            ruleId: rule.id,
            conditions: forwardExplainModels,
          }
        : null;
  }
}
export default ForwardExplainModel;
