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
}
export default FactService;
