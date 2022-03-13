import { RadioButton } from "primereact/radiobutton";
import { operator } from "../../../model/operator/Operator";
import FactEditor from "../../custom/FactEditor/FactEditor";
const GoalPicker = (props) => {
  const factEditTemplate = () => {
    return (
      <FactEditor
        style={{ maxWidth: "80vw" }}
        className="w-full pt-2"
        fact={props.goal}
        updateFact={(e) => {
          props.setGoal({ ...e, operator: operator.EQUALS });
        }}
      />
    );
  };

  return (
    <div className="mb-2 flex">
      <div className="flex">
        <h5 className="text-xl my-auto row-picker-header-width">Cel:</h5>
        <div
          style={{ margin: props.margin }}
          className="row-picker-option-width"
        >
          <RadioButton
            disabled={props.mandatory}
            inputId="allFacts"
            name="Wszystkie"
            value="Wnioskuj dla wszystkich faktów"
            onChange={(e) => e && props.setWithoutGoal(true)}
            checked={props.mandatory ? false : props.withoutGoal}
          />
          <label htmlFor="allFacts" className="ml-2">
            Bez celu
          </label>
        </div>

        <div
          style={{ margin: props.margin }}
          className="row-picker-option-width"
        >
          <RadioButton
            disabled={props.mandatory}
            inputId="withoutGoal"
            name="selectFacts"
            value="Wybrane"
            onChange={(e) => e && props.setWithoutGoal(false)}
            checked={props.mandatory ? true : !props.withoutGoal}
          />
          <label htmlFor="selectFacts" className="ml-2">
            Wybierz cel:
          </label>
        </div>
      </div>
      <div className="w-full mr-2 flex-column justify-center">
        {(props.mandatory ? true : !props.withoutGoal) && factEditTemplate()}
      </div>
    </div>
  );
};

GoalPicker.defaultProps = {
  margin: "1rem",
};
export default GoalPicker;
