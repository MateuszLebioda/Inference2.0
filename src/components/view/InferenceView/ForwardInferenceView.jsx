/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { ForwardMetrics } from "../../../model/metrics/ForwardMetrics";
import ForwardInference from "../../../services/inference/ForwardInference";
import { addMetrics } from "../../../slice/FileSlice";
import InferenceView from "./InferenceView";

const ForwardInferenceView = (props) => {
  const [block, setBlock] = useState(false);

  const dispatch = useDispatch();

  const forwardInference = new ForwardInference();

  const childRef = useRef();

  const handleInferenceStart = (
    name,
    colorValue,
    facts,
    goal,
    matchingStrategy
  ) => {
    setBlock(true);
    let metrics = new ForwardMetrics(
      name,
      colorValue,
      facts,
      goal,
      matchingStrategy
    );
    forwardInference.inference(metrics).then((r) => {
      let newMetrics = r.toPojo();
      dispatch(addMetrics({ metrics: newMetrics }));
      setBlock(false);
      childRef.current.resetState();
    });
  };

  return (
    <InferenceView
      ref={childRef}
      historyMessage="Wnioskowanie w przód"
      onInferenceStart={handleInferenceStart}
      blocking={block}
    />
  );
};

export default ForwardInferenceView;
