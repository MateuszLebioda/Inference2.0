import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useSelector } from "react-redux";
import {
  getButtonSectionWidth,
  renderButtons,
} from "../../custom/ActionIconButton/ActionIconButton";
import GlobalFilter from "../../custom/GlobalFilter/GlobalFIlter";
import MenuButton from "../../custom/MenuButton/MenuButton";
import "./MetricsTable.css";

const MetricsTable = (props) => {
  const metics = useSelector((state) => state.file.value.metrics);

  const menuItems = [
    {
      label: "Cofnij wszystkie zmiany",
      icon: "pi pi-refresh",
      command: () => {},
    },
  ];

  const renderHeader = () => {
    return (
      <div className="flex justify-content-between text-xl">
        <div className="mx-auto">Lista Metryk</div>
        <div className="flex">
          <GlobalFilter />
          <MenuButton menuItems={menuItems} tooltipPosition={"left"} />
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
        bodyClassName="metrics-view-iteration-column text-center"
        headerClassName="metrics-view-iteration-column"
        field="type"
        header="Typ"
        body={(e) => {
          return <i className={`pi pi-${e.type.toLowerCase()}`}></i>;
        }}
      />
      <Column
        bodyClassName="metrics-view-iteration-column text-center"
        headerClassName="metrics-view-iteration-column"
        field="iterations"
        header="Iteracje"
        body={(e) => <div className="mx-auto">{e.iterations}</div>}
      />
      <Column
        bodyClassName="metrics-view-checked-rules-column"
        headerClassName="metrics-view-checked-rules-column text-center"
        field="checkedRules"
        header="Sprawdzone reguły"
        body={(e) => <div className="mx-auto">{e.checkedRules}</div>}
      />
      <Column
        bodyClassName="metrics-view-activated-rules-column"
        headerClassName="metrics-view-activated-rules-column text-center"
        field="activatedRules.length"
        header="Aktywowane reguły"
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

export default MetricsTable;
