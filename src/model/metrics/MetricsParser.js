import { saveAs } from "file-saver";
import { ExportToCsv } from "export-to-csv";
import { utils, write } from "xlsx";

export class MetricsParser {
  prepareMetricToTable = (metrics) => {
    return {
      Id: metrics.id,
      "Data wygenerowania": metrics.date,
      Nazwa: metrics.name,
      Typ: metrics.type === "FORWARD" ? "W przód" : "W tył",
      Strategia: metrics.matchingStrategy,
      Iteracje: metrics.iterations ? metrics.iterations : "-",
      "Sprawdzonych reguł": metrics.checkedRules,
      "Aktywowanych reguł": metrics.activatedRules.length,
      "Nowe fakty": metrics.newFacts.length,
      "Fakty początkowe": metrics.factCount,
      "Reguły początkowe": metrics.ruleCount,
      "Atrybuty początkowe": metrics.attributeCount,
      "Całkowity czas w sekundach": metrics.totalTimeSecond,
      "Całkowity czas w milisekundach": metrics.totalTime,
    };
  };

  parseToExcel = (metrics) => {
    const worksheet = utils.json_to_sheet(
      metrics.map((m) => this.prepareMetricToTable(m))
    );

    const workbook = {
      Sheets: { "Metryki - Inference 2.0": worksheet },
      SheetNames: ["Metryki - Inference 2.0"],
    };

    const excelBuffer = write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    let EXCEL_TYPE =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const data = new Blob([excelBuffer], {
      type: EXCEL_TYPE,
    });
    saveAs(data, "Metrics.xlsx");
  };

  exportToCsv = (metric) => {
    let newMetrics = metric.map((m) => this.prepareMetricToTable(m));
    const csvExporter = new ExportToCsv({
      fieldSeparator: ";",
      quoteStrings: '"',
      decimalSeparator: ".",
      showLabels: true,
      showTitle: true,
      title: "Metryki - Inference 2.0",
      useTextFile: false,
      useKeysAsHeaders: true,
    });
    const blob = new Blob([csvExporter.generateCsv(newMetrics, true)], {
      type: "text/plain",
    });
    saveAs(blob, "Metrics.csv");
  };

  parseToJson = (metrics) => {
    let metricsString = JSON.stringify(
      {
        metrics: metrics,
        attributes: [],
        rules: [],
        facts: [],
        importType: "Inference2.0",
      },
      null,
      1
    );

    const blob = new Blob([metricsString], {
      type: "application/json",
    });
    saveAs(blob, "Metrics.json");
  };
}
