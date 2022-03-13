import { FilterMatchMode } from "primereact/api";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useState } from "react";
import { useSelector } from "react-redux";
import {
  getButtonSectionWidth,
  renderButtons,
} from "../../custom/ActionIconButton/ActionIconButton";
import EmptyTableMessage from "../../custom/EmptyTableMessage/EmptyTableMessage";
import GlobalFilter from "../../custom/GlobalFilter/GlobalFIlter";
import MenuButton from "../../custom/MenuButton/MenuButton";
import "./MetricsTable.css";

const MetricsTable = (props) => {
  const metics = useSelector((state) => state.file.value.metrics);

  const [filters, setFilters] = useState({
    global: { value: "", matchMode: FilterMatchMode.CONTAINS },
  });

  const renderHeader = () => {
    return (
      <div className="flex justify-content-between text-xl">
        <div className="mx-auto">Lista Metryk</div>
        <div className="flex">
          <GlobalFilter
            value={filters.global.value}
            changeValue={(e) =>
              setFilters((prev) => ({
                ...prev,
                global: { ...prev.global, value: e },
              }))
            }
          />
          {props.menuItems && <MenuButton menuItems={props.menuItems} />}
        </div>
      </div>
    );
  };

  const renderCountColumns = () => {
    return [
      { header: "Faktów początkowych", value: "factCount" },
      { header: "Reguł początkowych", value: "ruleCount" },
      { header: "Atrybutów początkowych", value: "attributeCount" },
    ].map((element) => (
      <Column
        bodyClassName="metrics-view-count-column metrics-table-content"
        headerClassName="metrics-view-count-column metrics-table-header metrics-table-header-center"
        field={element.value}
        header={element.header}
        body={(e) => <div className="mx-auto">{e[element.value]}</div>}
      />
    ));
  };

  return (
    <DataTable
      showGridlines={metics.length === 0 ? false : props.showGridlines}
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
      filters={filters}
      emptyMessage={<EmptyTableMessage value="Metryk" />}
    >
      {props.selection && (
        <Column
          selectionMode="multiple"
          bodyClassName="metrics-view-select-column metrics-table-content"
          headerClassName="metrics-view-select-column metrics-table-header"
        />
      )}
      <Column
        bodyClassName="metrics-view-date-column metrics-table-content"
        headerClassName="metrics-view-date-column metrics-table-header metrics-table-header-center"
        field="date"
        header="Data"
        body={(e) => <div className="text-center">{e.date}</div>}
      />
      <Column
        bodyClassName="metrics-view-name-column metrics-table-content"
        headerClassName="metrics-view-name-column metrics-table-header"
        field="name"
        header="Nazwa"
      />
      <Column
        bodyClassName="metrics-view-type-column text-center metrics-table-content"
        headerClassName="metrics-view-type-column text-center metrics-table-header metrics-table-header-center"
        field="type"
        header="Typ"
        body={(e) => {
          return (
            e.type && <i className={`pi pi-${e.type.toLowerCase()} w-full`}></i>
          );
        }}
      />
      <Column
        bodyClassName="metrics-view-matching-strategy-column metrics-table-content"
        headerClassName="metrics-view-matching-strategy-column metrics-table-header metrics-table-header-center"
        field="type"
        header={(e) => <div className="w-full text-center">Strategia</div>}
        body={(e) => (
          <div className="w-full text-center">{e.matchingStrategy}</div>
        )}
      />
      <Column
        bodyClassName="metrics-view-iteration-column text-center metrics-table-content"
        headerClassName="metrics-view-iteration-column text-center metrics-table-header metrics-table-header-center"
        field="iterations"
        header="Iteracje"
        body={(e) => (
          <div className="mx-auto">{e.iterations ? e.iterations : "-"}</div>
        )}
      />
      <Column
        bodyClassName="metrics-view-checked-rules-column metrics-table-content"
        headerClassName="metrics-view-checked-rules-column text-center metrics-table-header metrics-table-header-center"
        field="checkedRules"
        header={
          <div className="flex">Sprawdzone reguły</div>
          // <div className="flex">Sprawdzone reguły / Hipotezy pośrednie</div>
        }
        body={(e) => <div className="mx-auto">{e.checkedRules}</div>}
      />
      <Column
        bodyClassName="metrics-view-activated-rules-column metrics-table-content"
        headerClassName="metrics-view-activated-rules-column text-center metrics-table-header metrics-table-header-center"
        field="activatedRules.length"
        header={
          <div className="flex">Aktywowane reguły</div>
          // <div className="flex">Aktywowane reguły / Potwierdzone hipotezy</div>
        }
        body={(e) => <div className="mx-auto">{e.activatedRules.length}</div>}
      />
      <Column
        bodyClassName="metrics-view-new-facts-column metrics-table-content"
        headerClassName="metrics-view-new-facts-column text-center metrics-table-header metrics-table-header-center"
        field="newFacts.length"
        header="Nowe fakty"
        body={(e) => <div className="mx-auto">{e.newFacts.length}</div>}
      />
      {renderCountColumns()}
      <Column
        bodyClassName="metrics-view-time-column metrics-table-content"
        headerClassName="metrics-view-time-column text-center metrics-table-header metrics-table-header-center"
        field="totalTime"
        header="Czas [s]"
        body={(e) => <div className="mx-auto">{e.totalTimeSecond}</div>}
      />
      <Column
        bodyClassName="metrics-view-color-column metrics-table-content"
        headerClassName="metrics-view-color-column text-center metrics-table-header metrics-table-header-center"
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
        bodyClassName="metrics-view-color-column text-center metrics-table-content"
        headerClassName="metrics-view-color-column metrics-table-header metrics-table-header-center"
        header="Sukces"
        body={(e) => (
          <div className="w-full mx-auto">
            <i
              className={`pi pi-${
                e.success ? "check text-green-500" : "times text-pink-400"
              } `}
            />
          </div>
        )}
      />
      <Column
        bodyStyle={{
          flex: `0 0 ${getButtonSectionWidth(props.buttons)}`,
        }}
        headerStyle={{
          flex: `0 0 ${getButtonSectionWidth(props.buttons)}`,
        }}
        bodyClassName="metrics-view-buttons-column"
        headerClassName="metrics-view-buttons-column metrics-table-header"
        body={(m) => (
          <div className="flex">{renderButtons(props.buttons, m)}</div>
        )}
      />
    </DataTable>
  );
};

MetricsTable.defaultProps = {
  showGridlines: true,
  buttons: [],
};

export default MetricsTable;
