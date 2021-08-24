class RuleService {
  createEmptyRule = (id = null) => {
    return {
      id: id,
      conclusion: null,
      conditions: [],
    };
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
      let tempRule = this.copyRule(rule);
      tempRule.activated = false;
      tempRules.push(tempRule);
    });

    return tempRules;
  };
}

export default RuleService;
