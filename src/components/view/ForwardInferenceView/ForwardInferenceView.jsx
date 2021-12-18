/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "primereact/button";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import ForwardInference from "../../../services/inferance/ForwardInference";
import { changeHistory } from "../../../slice/HistorySlice";

const ForwardInferenceView = (props) => {
  const dispatch = useDispatch();

  const forwardInference = new ForwardInference();

  useEffect(() => {
    dispatch(changeHistory("Wnioskowanie w przód"));
  }, []);

  return (
    <>
      <Button
        label="Rozpocznij"
        onClick={(e) => {
          console.log(forwardInference.inference());
        }}
      ></Button>
    </>
  );
};

export default ForwardInferenceView;
