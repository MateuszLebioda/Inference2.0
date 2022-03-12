/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeMetrics } from "../../../slice/FileSlice";
import { changeHistory } from "../../../slice/HistorySlice";
import { deleteButton } from "../../custom/ActionIconButton/ActionIconButton";
import ExplainForwardDialog from "../../custom/Dialog/ExplainForwardDialog/ExplainForwardDialog";
import MetricsTable from "./MetricsTable";
import { MetricsParser } from "../../../model/metrics/MetricsParser";

const MetricsPreview = (props) => {
  const dispatch = useDispatch();

  const metics = useSelector((state) => state.file.value.metrics);

  const metricsParser = new MetricsParser();

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

  const menuItems = [
    {
      icon: "pi pi-file",
      label: "Zapisz jako .json",
      command: () => metricsParser.parseToJson(metics),
      disabled: metics.length === 0,
    },
    {
      icon: "pi pi-file-excel",
      label: "Zapisz jako .xlsx",
      command: () => metricsParser.parseToExcel(metics),
      disabled: metics.length === 0,
    },
    {
      icon: "pi pi-file",
      label: "Zapisz jako .csv",
      command: () => metricsParser.exportToCsv(metics),
      disabled: metics.length === 0,
    },
  ];

  return (
    <div>
      <MetricsTable buttons={buttons} showGridlines menuItems={menuItems} />
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
