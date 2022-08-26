import { attributeType } from "../../../model/attribute/AttributeType";
import { operator, symbolicOperator } from "../../../model/operator/Operator";
import FloatDropdown from "../FloatDropdown/FloatDropdown";

const OperatorDropdown = (props) => {
  return (
    <FloatDropdown
      value={props.value}
      options={Object.values(
        props.type === attributeType.SYMBOLIC ? symbolicOperator : operator
      )}
      className={props.className}
      onChange={(e) => {
        props.onChange(e);
      }}
    />
  );
};

export default OperatorDropdown;
