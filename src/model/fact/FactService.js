class FactService {
  createEmptyFact = (id) => {
    return {
      id: id,
      attributeID: null,
      type: null,
      value: null,
      operator: null,
    };
  };

  equals = (f1, f2) => {
    return (
      f1.attributeID === f2.attributeID &&
      f1.operator === f2.operator &&
      f1.value === f2.value
    );
  };

  updateValue = (fact, newValue) => {
    return { ...fact, value: newValue };
  };

  replaceFacts = (fact, updatedFacts) => {
    let tempFact = [...fact];
    updatedFacts.forEach((updatedRule) => {
      tempFact = this.replaceFact(tempFact, updatedRule);
    });
    return tempFact;
  };

  replaceFact = (facts, updatedFact) => {
    let tempFacts = [...facts];
    let index = tempFacts.findIndex((r) => r.id === updatedFact.id);
    tempFacts.splice(index, 1, updatedFact);

    return tempFacts;
  };
}
export default FactService;
