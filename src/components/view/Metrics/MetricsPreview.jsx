/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { removeMetrics } from "../../../slice/FileSlice";
import { changeHistory } from "../../../slice/HistorySlice";
import { deleteButton } from "../../custom/ActionIconButton/ActionIconButton";
import ExplainForwardDialog from "../../custom/Dialog/ExplainForwardDialog/ExplainForwardDialog";
import MetricsTable from "./MetricsTable";

const MetricsPreview = (props) => {
  const dispatch = useDispatch();

  const [isExplanationDialogVisible, setExplanationDialogVisible] = useState({
    visible: false,
    metric: null,
  });

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
    {
      id: null,
      icon: "pi-info-circle",
      style: null,
      className: null,
      tooltip: "Moduł objaśniający",
      tooltipPosition: "left",
      disabled: false,
      action: (m) => {
        setExplanationDialogVisible({
          visible: true,
          metric: m,
        });
      },
    },
  ];

  return (
    <div>
      <MetricsTable buttons={buttons} />
      <ExplainForwardDialog
        visible={isExplanationDialogVisible.visible}
        metric={isExplanationDialogVisible.metric}
        onHide={() =>
          setExplanationDialogVisible({
            visible: false,
            metric: null,
          })
        }
      />
    </div>
  );
};

export default MetricsPreview;
