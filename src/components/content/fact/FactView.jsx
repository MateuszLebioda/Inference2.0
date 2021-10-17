/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { changeHistory } from "../../../slice/HistorySlice";

const FactView = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeHistory("Facts"));
  }, []);

  return <div>Facts</div>;
};

export default FactView;
