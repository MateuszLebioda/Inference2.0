import { Dropdown } from "primereact/dropdown";
import AttributeTypeTemplate from "../AttributeTypeTemplate/AttributeTypeTemplate";

const FactDropdown = (props) => {
  const template = (fact) => {
    return fact ? (
      <div className="flex">
        <AttributeTypeTemplate option={fact.type} short />
        <div className="my-auto m-2">{fact.name}</div>
        <div className="my-auto m-2">{fact.operator}</div>
        <div className="my-auto m-2">{fact.value}</div>
      </div>
    ) : null;
  };

  return (
    <Dropdown
      placeholder="Wybierz atrybut"
      itemTemplate={template}
      valueTemplate={() => {
        return props.value ? (
          template(props.value)
        ) : (
          <div className="h-full mt-1 ml-2">Wybierz fakt</div>
        );
      }}
      value={props.value}
      options={props.facts}
      optionValue="id"
      style={{
        minWidth: "15rem",
        minHeight: "40px",
      }}
      onChange={props.onChange}
    />
  );
};

export default FactDropdown;
