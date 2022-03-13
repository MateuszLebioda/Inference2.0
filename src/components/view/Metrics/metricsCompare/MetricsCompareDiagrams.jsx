import { TabView, TabPanel } from "primereact/tabview";
import { useState } from "react";
import "./MetricsCompare.css";
import { RGBColorToHex } from "../../../../services/tools/RGBColorToHex";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LineElement,
  PointElement,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

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
          backgroundColor: props.metrics.map((m) =>
            rgbToHex.colorToHex(m.color)
          ),
        },
      ],
    };
  };

  const defaultOptions = {
    plugins: {
      legend: {
        position: "none",
      },
    },
  };

  const optionsSuccess = {
    plugins: {
      legend: {
        position: "none",
      },
    },
    scales: {
      y: {
        type: "category",
        labels: ["Tak", "Nie"],
        stackWeight: 1,
        offset: true,
      },
    },
  };

  const panels = [
    {
      name: "Całkowity czas w sekundach",
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
      name: "Nowe fakty",
      fn: (m) => m.newFacts.length,
    },
    {
      name: "Iteracje",
      fn: (m) => m.iterations,
    },
    {
      name: "Faktów początkowych",
      fn: (m) => m.factCount,
    },
    {
      name: "Reguł początkowych",
      fn: (m) => m.ruleCount,
    },
    {
      name: "Atrybutów początkowych",
      fn: (m) => m.attributeCount,
    },
    {
      name: "Sukces",
      fn: (m) => (m.success ? "Tak" : "Nie"),
      options: optionsSuccess,
    },
  ];

  const getTabPanel = ({ name, fn, options, type = "bar" }) => {
    return (
      <TabPanel header={name}>
        <div className="metrics-char-content-style">
          {!options ? (
            <Bar
              data={prepareData((m) => fn(m))}
              options={options ? options : defaultOptions}
            />
          ) : (
            <Line
              data={prepareData((m) => fn(m))}
              options={options ? options : defaultOptions}
            />
          )}
        </div>
      </TabPanel>
    );
  };

  return (
    <TabView
      activeIndex={activeIndex}
      onTabChange={(e) => setActiveIndex(e.index)}
    >
      {panels.map((p) => getTabPanel(p))}
    </TabView>
  );
};

export default MetricsCompareDiagrams;
