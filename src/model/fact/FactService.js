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
}
export default FactService;
