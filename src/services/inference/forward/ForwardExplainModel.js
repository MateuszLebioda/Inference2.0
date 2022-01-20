class ForwardExplainModel {
  constructor(fact, rule, forwardExplainModels) {
    this.fact = fact;
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
