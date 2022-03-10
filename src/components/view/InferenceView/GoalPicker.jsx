import { RadioButton } from "primereact/radiobutton";
import { operator } from "../../../model/operator/Operator";
import FactEditor from "../../custom/FactEditor/FactEditor";
const GoalPicker = (props) => {
  const factEditTemplate = () => {
    return (
      <div className="flex justify-content-center">
        <FactEditor
          style={{ maxWidth: "80vw" }}
          className="w-full"
          fact={props.goal}
          updateFact={(e) => {
            props.setGoal({ ...e, operator: operator.EQUALS });
          }}
        />
      </div>
    );
  };

  return (
    <div className="mb-2">
      <div className="flex">
        <h5 className="text-xl my-auto w-5rem">Cel:</h5>
        <div style={{ margin: props.margin }}>
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

        <div style={{ margin: props.margin }}>
          <RadioButton
            disabled={props.mandatory}
            inputId="withoutGoal"
            name="selectFacts"
            value="Wybrane"
            onChange={(e) => e && props.setWithoutGoal(false)}
            checked={props.mandatory ? true : !props.withoutGoal}
          />
          <label htmlFor="selectFacts" className="ml-2">
            Wybierz cel
          </label>
        </div>
      </div>
      {(props.mandatory ? true : !props.withoutGoal) && factEditTemplate()}
    </div>
  );
};

GoalPicker.defaultProps = {
  margin: "1rem",
};
export default GoalPicker;
