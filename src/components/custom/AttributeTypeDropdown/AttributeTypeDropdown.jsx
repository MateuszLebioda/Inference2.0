import { Dropdown } from "primereact/dropdown";
import { attributeType } from "../../../model/attribute/AttributeType";
import AttributeTypeTemplate from "../AttributeTypeTemplate/AttributeTypeTemplate";

const AttributeTypeDropdown = (props) => {
  return (
    <div className="p-field p-col-12 p-md-4">
      <span className="p-float-label">
        <Dropdown
          inputId="dropdown"
          style={props.style}
          value={props.selected}
          options={[attributeType.CONTINOUS, attributeType.SYMBOLIC]}
          onChange={(e) => props.changeType(e.value)}
          valueTemplate={<AttributeTypeTemplate option={props.selected} />}
          itemTemplate={(option) => <AttributeTypeTemplate option={option} />}
          className="p-column-filter"
        />
        <label htmlFor="dropdown">{props.label}</label>
      </span>
    </div>
  );
};

export default AttributeTypeDropdown;
