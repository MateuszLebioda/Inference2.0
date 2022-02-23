import DefaultInferenceHelper from "../helper/DefaultInferenceHelper";

class ForwardInferenceHelper extends DefaultInferenceHelper {
  isRulesConditionsMet = (rule, factsExplainModels) => {
    let isRequirementsMet = true;
    let factExplainArr = [];
    for (let c of rule.conditions) {
      let isConditionRequirementsMet = false;
      for (let f of factsExplainModels) {
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

export default ForwardInferenceHelper;
