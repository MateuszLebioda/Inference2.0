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

  handleRemoveAttribute = (rule, attributeID) => {
    if (rule.conclusion.attributeID === attributeID) {
      return null;
    }

    if (
      rule.conditions.length === 1 &&
      rule.conditions.attributeID === attributeID
    ) {
      return null;
    }

    let tempRule = this.copyRule(rule);
    tempRule.conditions = tempRule.conditions.filter(
      (c) => !(c.attributeID === attributeID)
    );
    return tempRule;
  };

  handleRemoveAttributeValue = (rule, change) => {
    if (
      rule.conclusion.attributeID === change.key &&
      rule.conclusion.value === change.oldValue
    ) {
      return null;
    }

    if (
      rule.conditions.length === 1 &&
      rule.conditions.attributeID === change.key &&
      rule.conditions.value === change.oldValue
    ) {
      return null;
    }

    let tempRule = this.copyRule(rule);
    tempRule.conditions = tempRule.conditions.filter(
      (c) => !(c.attributeID === change.key && c.value === change.oldValue)
    );
    return tempRule;
  };

  updateAttributeValue = (rule, change) => {
    let tempRule = this.createEmptyRule(rule.id);
    tempRule.conditions = this.updateRulesFacts(rule.conditions, change);
    tempRule.conclusion = this.updateRulesFacts([rule.conclusion], change)[0];
    return tempRule;
  };

  updateRulesFacts = (facts, change) => {
    return facts.map((fact) => {
      if (fact.attributeID === change.key && fact.value === change.oldValue) {
        return { ...fact, value: change.newValue };
      }
      return { ...fact };
    });
  };

  replaceRules = (rules, updatedRules) => {
    let tempRules = [...rules];
    updatedRules.forEach((updatedRule) => {
      tempRules = this.replaceRule(tempRules, updatedRule);
    });
    return tempRules;
  };

  replaceRule = (rules, updatedRule) => {
    let tempRules = [...rules];
    let index = tempRules.findIndex((r) => r.id === updatedRule.id);
    tempRules.splice(index, 1, updatedRule);

    return tempRules;
  };
}

export default RuleService;
