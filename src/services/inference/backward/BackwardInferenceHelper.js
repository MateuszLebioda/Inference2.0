import store from "../../../store";
import DefaultInferenceHelper from "../helper/DefaultInferenceHelper";

export class BackwardInferenceHelper extends DefaultInferenceHelper {
  findRulesPossibleToActivate = (conclusion) => {
    return store
      .getState()
      .file.value.rules.filter(
        (r) =>
          r.conclusion.attributeID === conclusion.attributeID &&
          r.conclusion.value === conclusion.value
      );
  };

  findConditionProve = (condition) => {
    return store
      .getState()
      .file.value.facts.find((f) => this.isRequirementsMet(f, condition));
  };
}
