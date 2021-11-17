import { Dropdown } from "primereact/dropdown";
import { attributeType } from "../../../model/attribute/AttributeType";
import { operator, symbolicOperator } from "../../../model/operator/Operator";

const OperatorDropdown = (props) => {
  return (
    <Dropdown
      value={props.value}
      options={Object.values(
        props.type === attributeType.SYMBOLIC ? symbolicOperator : operator
      )}
      className={props.className}
      onChange={(e) => props.onChange(e.target.value)}
    />
  );
};

export default OperatorDropdown;
