import { RadioButton } from "primereact/radiobutton";
import { ColorPicker } from "primereact/colorpicker";
import "./Picker.css";

const ColorPickerTemplate = (props) => {
  return (
    <div>
      <div className="flex">
        <h5 className="text-xl my-auto w-5rem">Kolor:</h5>
        <div
          style={{ margin: props.margin }}
          className="row-picker-option-width"
        >
          <RadioButton
            inputId="allFacts"
            name="Wszystkie"
            value="Wnioskuj dla wszystkich faktów"
            onChange={(e) => e && props.setRandom(true)}
            checked={props.random}
          />
          <label htmlFor="allFacts" className="ml-2">
            Losowy
          </label>
        </div>

        <div
          style={{ margin: props.margin }}
          className="row-picker-option-width"
        >
          <RadioButton
            inputId="selectFacts"
            name="selectFacts"
            value="Wybrane"
            onChange={(e) => e && props.setRandom(false)}
            checked={!props.random}
          />
          <label htmlFor="selectFacts" className="ml-2">
            Wybrany
          </label>
        </div>
      </div>
      {!props.random && (
        <ColorPicker
          inline
          format="rgb"
          value={props.color}
          onChange={(e) => props.setColor(e.value)}
        />
      )}
    </div>
  );
};

ColorPickerTemplate.defaultProps = {
  margin: "1rem",
};
export default ColorPickerTemplate;
