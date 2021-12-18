import { attributeType } from "../../../model/attribute/AttributeType";
import DependencyService from "../../../services/dependency/DependencyService";
import FloatDropdown from "../FloatDropdown/FloatDropdown";
import FloatInputNumber from "../FloatInputNumber/FloatInputNumber";

const RuleValueDropdown = (props) => {
  return props.type === attributeType.SYMBOLIC ? (
    <FloatDropdown
      errors={props.errors}
      label={!props.noHeader && "Wartość"}
      className={props.className}
      value={props.value}
      options={DependencyService.getAttributeCollectionValues(
        props.attributeID
      )}
      filter
      optionLabel="value"
      onChange={(e) => props.onChange(e)}
    />
  ) : (
    <FloatInputNumber
      errors={props.errors}
      label={!props.noHeader && "Wartość"}
      className={props.className}
      value={props.value}
      onChange={(e) => props.onChange(e)}
    />
  );
};

export default RuleValueDropdown;
