/* eslint-disable no-loop-func */
import { Inference } from "./Inference";

class ForwardInference extends Inference {
  inferenceImplementation = () => {
    let activatedRule;
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
    if (!this.metrics.goal && this.metrics.newFacts.length > 0) {
      this.metrics.markAsSuccess();
    }
  };

  findRuleToActivate = () => {
    this.metrics.incrementIterations();
    for (let r of this.inferenceRules) {
      if (!r.activated) {
        let ruleCheckAnswer = this.checkRule(r);
        if (ruleCheckAnswer) {
          r.activated = true;
          return ruleCheckAnswer;
        }
      }
    }
  };

  checkRule = (rule) => {
    this.metrics.incrementCheckedRules();
    let newFactsExplainMethod = this.isRulesConditionsMet(rule);
    if (newFactsExplainMethod.length > 0) {
      return {
        rule: rule,
        newFactsExplainMethod: newFactsExplainMethod,
      };
    }
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
