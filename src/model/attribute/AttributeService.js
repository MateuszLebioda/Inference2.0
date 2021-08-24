class AttributeService {
  createEmptyAttribute = () => {
    return {
      id: null,
      type: null,
      value: this.createEmptyAttributeValue(),
      desc: null,
      collections: [],
    };
  };

  createEmptyAttributeCollectionElement = (id = null, value = null) => {
    return {
      id: id,
      value: value,
    };
  };

  createEmptyAttributeValue = () => {
    return {
      id: null,
      value: null,
      type: null,
    };
  };
}

export default AttributeService;
