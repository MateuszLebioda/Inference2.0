/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Metrics } from "../../../model/metrics/Metrics";
import ForwardInference from "../../../services/inference/ForwardInference";
import { addMetrics } from "../../../slice/FileSlice";
import { changeHistory } from "../../../slice/HistorySlice";
import EmptyFunctionsList from "../../custom/EmptyFunctionsList/EmptyFunctionsList";
import FloatInput from "../../custom/FloatInput/FloatInput";
import PrimaryButton from "../../custom/PrimaryButton/PrimaryButton";
import ColorPickerTemplate from "./ColorPicker";
import FactPicker from "./FactPicker";

const ForwardInferenceView = (props) => {
  const dispatch = useDispatch();
  const facts = useSelector((state) => state.file.value.facts);
  const forwardInference = new ForwardInference();
  const [selectedFacts, setSelectedFacts] = useState([]);
  const [name, setName] = useState("");
  const [allFacts, setAllFacts] = useState(true);
  const [color, setColor] = useState({
    random: true,
    value: null,
  });

  useEffect(() => {
    dispatch(changeHistory("Wnioskowanie w przód"));
  }, []);

  if (facts.length === 0) {
    return <EmptyFunctionsList className="m-auto mt-5" />;
  }

  return (
    <>
      <div className="p-formgroup-inline m-3">
        <div className="flex w-full mt-5">
          <h5 className="text-xl my-auto w-5rem">Nazwa:</h5>
          <FloatInput
            className="my-auto w-full pl-2"
            label="Nazwa metryki"
            value={name}
            onChange={(e) => setName(e)}
          />
        </div>

        <ColorPickerTemplate
          random={color.random}
          color={color.value}
          setColor={(e) => {
            setColor((prev) => ({ ...prev, color: e }));
          }}
          setRandom={(e) => {
            setColor((prev) => ({
              ...prev,
              random: e,
              value: e ? null : prev.value,
            }));
          }}
        />
        <FactPicker
          all={allFacts}
          setAll={(e) => setAllFacts(e)}
          selectedFacts={selectedFacts}
          onSelect={(e) => setSelectedFacts(e)}
        />
        <div className="flex justify-content-end mt-3">
          <PrimaryButton
            label="Rozpocznij"
            icon="pi pi-cog"
            onClick={() => {
              let metrics = new Metrics(name, color.value);
              let newMetrics = forwardInference
                .inference(metrics, !allFacts && selectedFacts)
                .toPojo();
              dispatch(addMetrics({ metrics: newMetrics }));
            }}
          />
        </div>
      </div>
    </>
  );
};

export default ForwardInferenceView;
