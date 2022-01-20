import ForwardInferenceHelper from "../../../services/inference/forward/ForwardInferenceHelper";

const defaultMatchingStrategy = new ForwardInferenceHelper();

test("isRequirementsMetToSymbolicTypeEquals", () => {
  let fact = {
    id: 0,
    attributeID: "972",
    type: "CONTINOUS",
    value: "5000",
    operator: "=",
  };
  let conclusion = {
    id: 0,
    attributeID: "972",
    type: "CONTINOUS",
    value: "5000",
    operator: "=",
  };
  expect(
    defaultMatchingStrategy.isRequirementsMetToSymbolicType(fact, conclusion)
  ).toBe(true);
});
