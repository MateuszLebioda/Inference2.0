/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { removeMetrics } from "../../../slice/FileSlice";
import { changeHistory } from "../../../slice/HistorySlice";
import { deleteButton } from "../../custom/ActionIconButton/ActionIconButton";
import MetricsTable from "./MetricsTable";

const MetricsPreview = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeHistory("Lista metryk"));
  }, []);

  let buttons = [
    {
      ...deleteButton((c) => {
        dispatch(removeMetrics(c.id));
      }),
      tooltip: "Usuń metrykę",
    },
  ];

  return (
    <div>
      <MetricsTable buttons={buttons} />
    </div>
  );
};

export default MetricsPreview;
