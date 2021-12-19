import { Chart } from "primereact/chart";
import { useEffect, useState } from "react";

const ForwardInferenceRadar = (props) => {
  const headers = [
    "Całkowity czas [ms]",
    "Liczba iteracji",
    "Liczba nowych faktów",
  ];

  const [datasets, setDataSets] = useState({ labels: headers, datasets: [] });

  useEffect(() => {
    setDataSets((prev) => ({
      ...prev,
      datasets: props.metrics.map((m, i) => convertMetrics(m, i)),
    }));
  }, [props.metrics]);

  const convertMetrics = (metrics, i) => {
    // let color = RandomRGBColor.getRandomColor();
    // let backgroundColor = RandomRGBColor.addOpacity(color, "0.2");
    // let mainColor = RandomRGBColor.addOpacity(color, "1");
    // return {
    //   label: `Wnioskowanie numer: ${i}`,
    //   backgroundColor: backgroundColor,
    //   borderColor: mainColor,
    //   pointBackgroundColor: mainColor,
    //   pointBorderColor: "#fff",
    //   pointHoverBackgroundColor: "#fff",
    //   pointHoverBorderColor: mainColor,
    //   data: [
    //     metrics.getTotalTime(),
    //     metrics.iterations,
    //     metrics.newFacts.length,
    //   ],
    // };
  };

  const lightOptions = {
    plugins: {
      legend: {
        labels: {
          color: "#495057",
        },
      },
    },
    scales: {
      r: {
        pointLabels: {
          color: "#495057",
        },
        grid: {
          color: "#ebedef",
        },
        angleLines: {
          color: "#ebedef",
        },
      },
    },
  };

  return (
    <div className="card p-d-flex p-jc-center">
      <Chart
        type="radar"
        data={datasets}
        options={lightOptions}
        style={{ position: "relative", width: "40%" }}
      />
    </div>
  );
};

export default ForwardInferenceRadar;
