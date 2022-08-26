/* eslint-disable no-loop-func */
import ExplainModel from "../../model/metrics/ExplainModel";
import { Inference } from "./Inference";

class ForwardInference extends Inference {
  inferenceImplementation = () => {
    let activatedRule;
    if (this.metrics.isGoalFulFilled()) {
      this.metrics.newFacts.push(new ExplainModel(this.metrics.goal));
      this.metrics.markAsSuccess();
    } else {
      while ((activatedRule = this.findRuleToActivate())) {
        this.metrics.addActivatedRule(activatedRule.rule);
        this.metrics.addNewFactExplainModel(
          activatedRule.rule,
          activatedRule.newFactsExplainMethod
        );
        if (this.metrics.isGoalFulFilled()) {
          this.metrics.markAsSuccess();
          break;
        }
      }
    }
    if (!this.metrics.goal && this.metrics.newFacts.length > 0) {
      this.metrics.markAsSuccess();
    }
  };

  findRuleToActivate = () => {
    this.metrics.incrementIterations();
    let conflictSet = this.applyStrategyRule(this.getConflictSet());
    let ruleToActive = conflictSet.find((r) => !r.activated);
    if (ruleToActive) {
      this.inferenceRules.find(
        (rule) => rule.id === ruleToActive.id
      ).activated = true;
      return this.checkRule(ruleToActive);
    }
  };

  applyStrategyRule = (conflictSet) => {
    return this.metrics.matchingStrategy.implementation.matchRules(conflictSet);
  };

  getConflictSet = () => {
    return this.inferenceRules.filter((r) => {
      this.metrics.incrementCheckedRules();
      return this.isRulesConditionsMet(r).length > 0;
    });
  };

  checkRule = (rule) => {
    return {
      rule: rule,
      newFactsExplainMethod: this.isRulesConditionsMet(rule),
    };
  };

  isRulesConditionsMet = (rule) => {
    let factsEM = this.metrics.getAllFactExplainModels();
    let isRequirementsMet = true;
    let factExplainArr = [];
    for (let c of rule.conditions) {
      let isConditionRequirementsMet = false;
      for (let f of factsEM) {
        if (this.isRequirementsMet(f.fact, c)) {
          isConditionRequirementsMet = true;
          factExplainArr.push(f);
          break;
        }
      }
      if (!isConditionRequirementsMet) {
        isRequirementsMet = false;
        break;
      }
    }
    return isRequirementsMet ? factExplainArr : [];
  };
}

export default ForwardInference;
