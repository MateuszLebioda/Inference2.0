import { useState } from "react";
import DependencyService from "../../../services/dependency/DependencyService";
import AttributeTypeTemplate from "../AttributeTypeTemplate/AttributeTypeTemplate";
import FloatDropdown from "../FloatDropdown/FloatDropdown";

const RuleAttributeDropdown = (props) => {
  const [attributes] = useState(DependencyService.getAttributesValue());

  const itemTemplate = (e) => {
    return (
      <div className="flex">
        <AttributeTypeTemplate option={e.type} short />
        <div className="pl-2 my-auto">{e.value}</div>
      </div>
    );
  };

  return (
    <FloatDropdown
      errors={props.errors}
      label={!props.noHeader && "Nazwa atrybutu"}
      className={props.className}
      value={props.value}
      options={attributes}
      filter
      optionLabel="value"
      itemTemplate={itemTemplate}
      onChange={(e) => {
        props.onChange(attributes.find((a) => a.value === e));
      }}
    />
  );
};

export default RuleAttributeDropdown;
