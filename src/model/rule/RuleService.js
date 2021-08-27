class RuleService {
  createEmptyRule = (id = null) => {
    return {
      id: id,
      conclusion: null,
      conditions: [],
    };
  };

  createEmptyRuleToInference = (rule = null) => {
    let tempRule;
    tempRule.activated = false;
    if (rule) {
      tempRule = this.copyRule(rule);
    } else {
      tempRule = this.createEmptyRule();
    }
    tempRule.activated = false;
    return tempRule;
  };

  copyRule = (rule) => {
    let tempRule = this.createEmptyRule();
    tempRule.conclusion = rule.conclusion;
    tempRule.conditions = [...rule.conditions];
    return tempRule;
  };

  copyRulesAndMarkAsNotActive = (rules) => {
    let tempRules = [];

    rules.forEach((rule) => {
      tempRules.push(this.createEmptyRuleToInference(rule));
    });

    return tempRules;
  };
}

export default RuleService;
