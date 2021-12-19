/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { changeHistory } from "../../../slice/HistorySlice";
import MetricsTable from "./MetricsTable";

const MetricsPreview = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeHistory("Lista metryk"));
  }, []);

  return (
    <div>
      <MetricsTable />
    </div>
  );
};

export default MetricsPreview;
