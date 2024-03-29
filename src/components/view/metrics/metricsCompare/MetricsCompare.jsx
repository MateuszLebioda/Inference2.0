/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeHistory } from "../../../../slice/HistorySlice";
import { Accordion, AccordionTab } from "primereact/accordion";
import MetricsTable from "../MetricsTable";
import MetricsCompareDiagrams from "./MetricsCompareDiagrams";

const MetricsCompare = (props) => {
  const dispatch = useDispatch();

  const metics = useSelector((state) => state.file.value.metrics);

  const [selected, setSelected] = useState(metics);
  const [activeIndex, setActiveIndex] = useState(1);

  useEffect(() => {
    dispatch(changeHistory("Porównanie metryk"));
  }, []);

  useEffect(() => {
    if (props.match.params.metricsIds) {
      let metricsIds = JSON.parse(props.match.params.metricsIds);
      setSelected(
        metricsIds
          .map((mid) => metics.find((m) => m.id === mid))
          .filter((m) => m !== null && m !== undefined)
      );
    }
  }, [props.match]);

  return (
    <Accordion
      className="accordion-style"
      activeIndex={activeIndex}
      onTabChange={(e) => {
        setActiveIndex(e.index != null ? e.index : 1);
      }}
    >
      <AccordionTab header={`Wybierz metryki: ${selected.length}`}>
        <MetricsTable
          showGridlines={false}
          scrollHeight="calc(100vh - 280px)"
          selection={selected}
          onSelect={(e) => setSelected(e)}
        />
      </AccordionTab>
      <AccordionTab header="Porównaj metryki">
        <MetricsCompareDiagrams metrics={selected} />
      </AccordionTab>
    </Accordion>
  );
};

export default MetricsCompare;
