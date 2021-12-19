import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { useEffect, useState } from "react";
import GlobalFilter from "../../custom/GlobalFilter/GlobalFIlter";
import ActionIconButton, {
  getButtonSectionWidth,
} from "../../custom/ActionIconButton/ActionIconButton";
import AttributeTypeTemplate from "../../custom/AttributeTypeTemplate/AttributeTypeTemplate";
import AttributeTypeDropdown from "../../custom/AttributeTypeDropdown/AttributeTypeDropdown";
import DependencyService from "../../../services/dependency/DependencyService";
import MenuButton from "../../custom/MenuButton/MenuButton";

const FactTable = (props) => {
  const [completeFacts, setCompleteFacts] = useState([]);

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    type: { value: null, matchMode: FilterMatchMode.CONTAINS },
    attributeName: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
    },
    value: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
    },
  });

  useEffect(() => {
    setCompleteFacts(DependencyService.getCompleteFacts(props.facts));
  }, [props.facts]);

  const renderHeader = () => {
    return (
      <div className="space-between" style={{ fontSize: "17px" }}>
        <div style={{ margin: "auto" }}>Lista Faktów</div>
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
          {props.menuItems.length > 0 && (
            <MenuButton menuItems={props.menuItems} tooltipPosition={"left"} />
          )}
        </div>
      </div>
    );
  };

  const buttonsTemplates = (fact) => {
    let buttonsSection = props.buttons.map((b, i) => (
      <ActionIconButton
        key={`attribute-button-${i}`}
        icon={b.icon}
        className={b.className}
        tooltip={b.tooltip}
        tooltipPosition={b.tooltipPosition}
        action={() => b.action(fact)}
      />
    ));
    return (
      <div className="start-from-right" start-from-right>
        {buttonsSection}
      </div>
    );
  };

  const getAttributeTemplate = (fact) => {
    return <div className="pl-1 w-full text-right">{fact.attributeName}</div>;
  };

  const typeFilter = (options) => {
    return (
      <AttributeTypeDropdown
        placeholder="Wybierz typ"
        selected={options.value}
        changeType={(e) => options.filterCallback(e)}
      />
    );
  };

  return (
    <DataTable
      className={`row-padding ${props.className}`}
      paginator={props.facts.length > 0}
      rows={25}
      value={completeFacts}
      header={renderHeader()}
      filters={filters}
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
      {props.selection && (
        <Column
          selectionMode="multiple"
          bodyClassName="fact-view-select-column"
          headerClassName="fact-view-select-column"
        />
      )}
      <Column
        bodyClassName="fact-view-type-column"
        headerClassName="fact-view-type-column"
        field="type"
        header="Typ"
        filter
        filterElement={typeFilter}
        showFilterMatchModes={false}
        body={(a) => (
          <AttributeTypeTemplate option={a.type} short={props.shortType} />
        )}
      />
      <Column
        bodyClassName="fact-view-attribute- cursor-default"
        headerClassName="fact-view-attribute-column"
        field="attributeName"
        header={() => <div className="w-full text-right">Atrybut</div>}
        filter
        body={(e) => getAttributeTemplate(e)}
      />
      <Column
        bodyClassName="fact-view-operator-column cursor-default"
        headerClassName="fact-view-operator-column"
        field="operator"
        header="Operator"
        body={(e) => <div className="mx-auto">{e.operator}</div>}
      />
      <Column
        bodyClassName="fact-view-value-column cursor-default"
        headerClassName="fact-view-value-column"
        field="value"
        header="Wartość"
        filter
      />
      <Column
        bodyClassName="fact-view-value-column"
        headerClassName="fact-view-value-column"
        bodyStyle={{ flex: `0 0 ${getButtonSectionWidth(props.buttons)}` }}
        headerStyle={{ flex: `0 0 ${getButtonSectionWidth(props.buttons)}` }}
        body={(f) => buttonsTemplates(f)}
      />
    </DataTable>
  );
};

FactTable.defaultProps = {
  shortType: false,
  facts: [],
  buttons: [],
  menuItems: [],
  selection: null,
  onSelect: null,
};

export default FactTable;
