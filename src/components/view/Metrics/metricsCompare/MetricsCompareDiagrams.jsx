import { TabView, TabPanel } from "primereact/tabview";
import { useState } from "react";
import { Chart } from "primereact/chart";
import "./MetricsCompare.css";
import { RGBColorToHex } from "../../../../services/tools/RGBColorToHex";

const MetricsCompareDiagrams = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const rgbToHex = new RGBColorToHex();

  const prepareData = (mapFn, title) => {
    return {
      labels: props.metrics.map((m) => m.name),
      datasets: [
        {
          label: title,
          data: props.metrics.map((m) => mapFn(m)),
          fill: false,
          backgroundColor: props.metrics.map((m) =>
            rgbToHex.colorToHex(m.color)
          ),
        },
      ],
    };
  };

  const options = {
    plugins: {
      legend: {
        position: "none",
      },
    },
  };

  const panels = [
    {
      name: "Całkowity czas w milisekundach",
      fn: (m) => m.totalTimeSecond,
    },
    {
      name: "Sprawdzone reguły",
      fn: (m) => m.checkedRules,
    },
    {
      name: "Aktywowane reguły",
      fn: (m) => m.activatedRules.length,
    },
    {
      name: "Początkowe fakty",
      fn: (m) => m.startFacts.length,
    },
    {
      name: "Nowe fakty",
      fn: (m) => m.newFacts.length,
    },
    {
      name: "Iteracje",
      fn: (m) => m.iterations,
    },
    {
      name: "Hipotezy pośrednie",
      fn: (m) => (m.indirectHypothesis ? m.indirectHypothesis.length : 0),
    },
  ];

  const getTabPanel = ({ name, fn, type = "bar" }) => {
    return (
      <TabPanel header={name}>
        <Chart
          className="metrics-char-content-style"
          type={type}
          data={prepareData((m) => fn(m))}
          options={options}
        />
      </TabPanel>
    );
  };

  return (
    <TabView
      activeIndex={activeIndex}
      onTabChange={(e) => setActiveIndex(e.index)}
    >
      {panels.map((p) => getTabPanel(p))}
      {/* <TabPanel header="Całkowity czas">
        <Chart
          className="metrics-char-content-style"
          type="bar"
          data={prepareData(
            (m) => m.totalTimeSecond,
            "Całkowity czas w milisekundach"
          )}
          options={options}
        />
      </TabPanel>
      {getTabPanel("Całkowity czas w milisekundach", (m) => m.totalTimeSecond)}
      <TabPanel header="Sprawdzone reguły"></TabPanel>
      <TabPanel header="Aktywowane reguły"></TabPanel>
      <TabPanel header="Początkowe fakty"></TabPanel>
      <TabPanel header="Nowe fakty"></TabPanel>
      <TabPanel header="Iteracje"></TabPanel>
      <TabPanel header="Hipotezy pośrednie"></TabPanel> */}
    </TabView>
  );
};

export default MetricsCompareDiagrams;
