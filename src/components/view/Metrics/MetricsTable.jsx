import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useSelector } from "react-redux";
import "./MetricsTable.css";

const MetricsTable = (props) => {
  const metics = useSelector((state) => state.file.value.metrics);
  return (
    <DataTable
      className={`row-padding ${props.className}`}
      paginator={metics.length > 0}
      rows={25}
      value={metics}
      //   header={renderHeader()}
      //   filters={filters}
      scrollable
      scrollHeight="calc(100vh - 170px)"
      selectionMode={props.selection && "checkbox"}
      dataKey="id"
      selection={props.selection}
      onSelectionChange={(e) => {
        let tempFact = { ...e };
        delete tempFact.attributeName;
        props.onSelect(tempFact);
      }}
    >
      {/* {props.selection && (
        <Column
          selectionMode="multiple"
          bodyClassName="fact-view-select-column"
          headerClassName="fact-view-select-column"
        />
      )} */}
      <Column
        bodyClassName="metrics-view-date-column"
        headerClassName="metrics-view-date-column"
        field="date"
        header="Data"
      />
      <Column
        bodyClassName="metrics-view-date-column"
        headerClassName="metrics-view-date-column"
        field="name"
        header="Nazwa"
      />
      <Column
        bodyClassName="metrics-view-date-column"
        headerClassName="metrics-view-date-column"
        field="iterations"
        header="Iteracje"
      />
      <Column
        bodyClassName="metrics-view-date-column"
        headerClassName="metrics-view-date-column"
        field="checkedRules"
        header="Sprawdzone reguły"
      />
      <Column
        bodyClassName="metrics-view-date-column"
        headerClassName="metrics-view-date-column"
        field="activatedRules.length"
        header="Aktywowane reguły"
      />
      <Column
        bodyClassName="metrics-view-date-column"
        headerClassName="metrics-view-date-column"
        field="newFacts.length"
        header="Nowe fakty"
      />
      <Column
        bodyClassName="metrics-view-date-column"
        headerClassName="metrics-view-date-column"
        field="totalTime"
        header="Czas [ms]"
      />
      <Column
        bodyClassName="metrics-view-date-column"
        headerClassName="metrics-view-date-column"
        header="Color"
        body={(m) => (
          <div
            className="w-1rem h-1rem"
            style={{
              backgroundColor: `rgb(${m.color.r},${m.color.g},${m.color.b})`,
            }}
          ></div>
        )}
      />
    </DataTable>
  );
};

export default MetricsTable;