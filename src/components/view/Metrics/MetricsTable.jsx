import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useSelector } from "react-redux";
import {
  getButtonSectionWidth,
  renderButtons,
} from "../../custom/ActionIconButton/ActionIconButton";
import GlobalFilter from "../../custom/GlobalFilter/GlobalFIlter";
import "./MetricsTable.css";

const MetricsTable = (props) => {
  const metics = useSelector((state) => state.file.value.metrics);

  const renderHeader = () => {
    return (
      <div className="flex justify-content-between text-xl">
        <div className="mx-auto">Lista Metryk</div>
        <div className="flex">
          <GlobalFilter />
        </div>
      </div>
    );
  };

  return (
    <DataTable
      header={renderHeader()}
      className={`row-padding ${props.className}`}
      paginator={metics.length > 0}
      rows={25}
      value={metics}
      scrollable
      scrollHeight={
        props.scrollHeight ? props.scrollHeight : `calc(100vh - 170px)`
      }
      selectionMode={props.selection && "checkbox"}
      dataKey="id"
      selection={props.selection}
      onSelectionChange={(e) => {
        props.onSelect(e.value);
      }}
    >
      {props.selection && (
        <Column
          selectionMode="multiple"
          bodyClassName="metrics-view-select-column"
          headerClassName="metrics-view-select-column"
        />
      )}
      <Column
        bodyClassName="metrics-view-date-column"
        headerClassName="metrics-view-date-column"
        field="date"
        header="Data"
        body={(e) => <div className="text-center">{e.date}</div>}
      />
      <Column
        bodyClassName="metrics-view-name-column"
        headerClassName="metrics-view-name-column"
        field="name"
        header="Nazwa"
      />
      <Column
        bodyClassName="metrics-view-type-column text-center"
        headerClassName="metrics-view-type-column"
        field="type"
        header="Typ"
        body={(e) => {
          return (
            e.type && <i className={`pi pi-${e.type.toLowerCase()} w-full`}></i>
          );
        }}
      />
      <Column
        bodyClassName="metrics-view-matching-strategy-column"
        headerClassName="metrics-view-matching-strategy-column"
        field="type"
        header={(e) => <div className="w-full text-center">Strategia</div>}
        body={(e) => (
          <div className="w-full text-center">{e.matchingStrategy}</div>
        )}
      />

      <Column
        bodyClassName="metrics-view-iteration-column text-center"
        headerClassName="metrics-view-iteration-column"
        field="iterations"
        header="Iteracje"
        body={(e) => (
          <div className="mx-auto">{e.iterations ? e.iterations : "-"}</div>
        )}
      />
      <Column
        bodyClassName="metrics-view-checked-rules-column"
        headerClassName="metrics-view-checked-rules-column text-center"
        field="checkedRules"
        header={
          <div className="flex">Sprawdzone reguły / Hipotezy pośrednie</div>
        }
        body={(e) => <div className="mx-auto">{e.checkedRules}</div>}
      />
      <Column
        bodyClassName="metrics-view-activated-rules-column"
        headerClassName="metrics-view-activated-rules-column text-center"
        field="activatedRules.length"
        header={
          <div className="flex">Aktywowane reguły / Potwierdzone hipotezy</div>
        }
        body={(e) => <div className="mx-auto">{e.activatedRules.length}</div>}
      />
      <Column
        bodyClassName="metrics-view-new-facts-column"
        headerClassName="metrics-view-new-facts-column text-center"
        field="newFacts.length"
        header="Nowe fakty"
        body={(e) => <div className="mx-auto">{e.newFacts.length}</div>}
      />
      <Column
        bodyClassName="metrics-view-time-column"
        headerClassName="metrics-view-time-column text-center"
        field="totalTime"
        header="Czas [ms]"
        body={(e) => <div className="mx-auto">{e.totalTime}</div>}
      />

      <Column
        bodyClassName="metrics-view-color-column"
        headerClassName="metrics-view-color-column text-center"
        header="Kolor"
        body={(m) => (
          <div
            className="w-1rem h-1rem mx-auto"
            style={{
              backgroundColor: `rgb(${m.color.r},${m.color.g},${m.color.b})`,
            }}
          ></div>
        )}
      />
      <Column
        bodyStyle={{ flex: `0 0 ${getButtonSectionWidth(props.buttons)}` }}
        headerStyle={{ flex: `0 0 ${getButtonSectionWidth(props.buttons)}` }}
        body={(m) => (
          <div className="flex">{renderButtons(props.buttons, m)}</div>
        )}
      />
    </DataTable>
  );
};

MetricsTable.defaultProps = {
  buttons: [],
};

export default MetricsTable;
