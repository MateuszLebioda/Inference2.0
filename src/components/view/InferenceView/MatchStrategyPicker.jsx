import { Dropdown } from "primereact/dropdown";
import { RuleMatchingStrategies } from "../../../services/inference/ruleMatchingStrategies/RuleMatchingStategies";

const MatchStrategyPicker = (props) => {
  return (
    <div>
      <div className="flex">
        <h5 className="text-xl my-auto w-15rem">Strategia doboru reguł:</h5>
        <Dropdown
          style={{ minWidth: "30rem" }}
          options={RuleMatchingStrategies}
          optionLabel="name"
          itemTemplate={(e) => <div>{e.name}</div>}
          valueTemplate={(e) => <div>{e.name}</div>}
          value={props.value}
          onChange={(e) => {
            props.onChange(e);
          }}
        />
        <div style={{ margin: props.margin }}></div>
      </div>
      <div className="mt-2 text-600">{props.value.desc}</div>
    </div>
  );
};

export default MatchStrategyPicker;
