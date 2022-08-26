import { attributeType } from "../model/attribute/AttributeType";
import store from "../store";

class IdService {
  getId = (array) => {
    if (array.length === 0) return 0;
    return Math.max(...array.map((a) => a.id)) + 1;
  };

  getNextAttributeCollectionId = () => {
    let attributes = [...store.getState().file.value.attributes];

    const id =
      Math.max(
        ...attributes
          .filter((a) => a.type === attributeType.SYMBOLIC)
          .flatMap((a) => a.collections.flatMap((c) => Number(c.id)))
      ) + 1;

    return id;
  };

  getNextConditionId = () => {
    let rules = [...store.getState().file.value.rules];
    const id =
      Math.max(
        ...rules.flatMap((r) => r.conditions.flatMap((c) => Number(c.id)))
      ) + 1;

    return id;
  };

  getNextConditionIdToTempElement = (conditions) => {
    let rules = [...store.getState().file.value.rules];
    const id =
      Math.max(
        ...rules.flatMap((r) => r.conditions.flatMap((c) => Number(c.id)))
      ) + 1;

    const idTemp = Math.max(...conditions.flatMap((c) => Number(c.id))) + 1;

    return Math.max(...[id, idTemp]);
  };
}
export default new IdService();
