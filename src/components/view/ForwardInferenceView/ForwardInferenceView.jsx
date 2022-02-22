/* eslint-disable react-hooks/exhaustive-deps */
import { BlockUI } from "primereact/blockui";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { ForwardMetrics } from "../../../model/metrics/ForwardMetrics";
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
  const [block, setBlock] = useState(false);
  const [name, setName] = useState("");
  const [allFacts, setAllFacts] = useState(true);
  const [color, setColor] = useState({
    random: true,
    value: null,
  });

  const resetState = () => {
    setName("");
    setAllFacts(true);
    setColor({
      random: true,
      value: null,
    });
  };

  useEffect(() => {
    dispatch(changeHistory("Wnioskowanie w przód"));
  }, []);

  if (facts.length === 0) {
    return <EmptyFunctionsList className="m-auto mt-5" />;
  }

  return (
    <BlockUI
      blocked={block}
      fullScreen
      template={
        <div>
          <i className="pi pi-spin pi-spinner" style={{ fontSize: "3em" }} />
          Wnioskuję ...
        </div>
      }
    >
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
            setColor((prev) => ({ ...prev, value: e }));
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
              setBlock(true);
              let metrics = new ForwardMetrics(
                name,
                color.value,
                !allFacts && selectedFacts
              );
              forwardInference.inference(metrics).then((r) => {
                let newMetrics = r.toPojo();
                dispatch(addMetrics({ metrics: newMetrics }));
                setBlock(false);
                resetState();
              });
            }}
          />
        </div>
      </div>
    </BlockUI>
  );
};

export default ForwardInferenceView;
