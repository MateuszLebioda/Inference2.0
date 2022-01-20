import { Dropdown } from "primereact/dropdown";
import { useState } from "react";
import { useEffect } from "react";
import DependencyService from "../../../services/dependency/DependencyService";
import AttributeTypeTemplate from "../AttributeTypeTemplate/AttributeTypeTemplate";

const FactDropdown = (props) => {
  const [preparedFacts, setPreparedFacts] = useState([]);
  const [preparedValue, setPreparedValue] = useState(null);

  useEffect(() => {
    if (props.facts) {
      setPreparedFacts(DependencyService.getCompleteFacts(props.facts));
    }
  }, [props.facts]);

  useEffect(() => {
    if (props.value) {
      setPreparedValue(DependencyService.getCompleteFact(props.value));
    }
  }, [props.value]);

  const template = (fact) => {
    return fact ? (
      <div className="flex">
        <AttributeTypeTemplate option={fact.type} short />
        <div className="my-auto m-2">{fact.attributeName}</div>
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
        return preparedValue ? (
          template(preparedValue)
        ) : (
          <div className="h-full mt-1 ml-2">Wybierz fakt</div>
        );
      }}
      value={preparedValue}
      options={preparedFacts}
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
