import { RadioButton } from "primereact/radiobutton";
import { useSelector } from "react-redux";
import FactTable from "../../content/fact/FactTable";
const FactPicker = (props) => {
  const facts = useSelector((state) => state.file.value.facts);

  return (
    <div>
      <div className="flex">
        <h5 className="text-xl my-auto w-5rem">Fakty:</h5>
        <div style={{ margin: props.margin }}>
          <RadioButton
            inputId="allFacts"
            name="Wszystkie"
            value="Wnioskuj dla wszystkich faktów"
            onChange={(e) => e && props.setAll(true)}
            checked={props.all}
          />
          <label htmlFor="allFacts" className="ml-2">
            Wszystkie
          </label>
        </div>

        <div style={{ margin: props.margin }}>
          <RadioButton
            inputId="selectFacts"
            name="selectFacts"
            value="Wybrane"
            onChange={(e) => e && props.setAll(false)}
            checked={!props.all}
          />
          <label htmlFor="selectFacts" className="ml-2">
            Wybrane
          </label>
        </div>
      </div>
      {!props.all && (
        <FactTable
          facts={facts}
          className="border-1 border-400"
          selection={props.selectedFacts}
          onSelect={(e) => props.onSelect(e.value)}
        />
      )}
    </div>
  );
};

FactPicker.defaultProps = {
  margin: "1rem",
};
export default FactPicker;
