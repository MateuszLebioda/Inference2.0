import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { BackwardMetrics } from "../../../model/metrics/BackwardMetric";
import { BackwardInference } from "../../../services/inference/BackwardInference";
import { addMetrics } from "../../../slice/FileSlice";
import InferenceView from "./InferenceView";

const BackwardInferenceView = (props) => {
  const [block, setBlock] = useState(false);

  const dispatch = useDispatch();

  const backwardInference = new BackwardInference();

  const childRef = useRef();

  const handleInferenceStart = (
    name,
    colorValue,
    facts,
    goal,
    matchingStrategy
  ) => {
    let metrics = new BackwardMetrics(
      name,
      colorValue,
      facts,
      goal,
      matchingStrategy
    );
    backwardInference.inference(metrics).then((r) => {
      let newMetrics = r.toPojo();
      dispatch(addMetrics({ metrics: newMetrics }));
      setBlock(false);
    });
    childRef.current.resetState();
  };

  return (
    <InferenceView
      ref={childRef}
      historyMessage="Wnioskowanie w tył"
      onInferenceStart={handleInferenceStart}
      blocking={block}
      block={() => setBlock(true)}
      goalMandatory
    />
  );
};

export default BackwardInferenceView;
