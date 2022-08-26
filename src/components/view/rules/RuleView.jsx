/* eslint-disable react-hooks/exhaustive-deps */
import { FilterService } from "primereact/api";
import { Column } from "primereact/column";
import { confirmDialog } from "primereact/confirmdialog";
import { DataTable } from "primereact/datatable";
import { Menu } from "primereact/menu";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DependencyService from "../../../services/dependency/DependencyService";
import UpdateModelService from "../../../services/model/UpdateModelService";
import { changeHistory } from "../../../slice/HistorySlice";
import ActionIconButton, {
  getButtonSectionWidth,
} from "../../custom/ActionIconButton/ActionIconButton";
import AndTemplate from "../../custom/AndTemplate/AndTemplate";
import EmptyTableMessage from "../../custom/EmptyTableMessage/EmptyTableMessage";
import GlobalFilter from "../../custom/GlobalFilter/GlobalFIlter";
import IfTemplate from "../../custom/IfTemplate/IfTemplate";
import MenuButton from "../../custom/MenuButton/MenuButton";
import ThenTemplate from "../../custom/ThenTemplate/ThenTemplate";
import RuleDisplay from "./RuleDisplay";
import RuleEditDialog from "./RuleEditDialog/RuleEditDialog";
import "./RuleView.css";

const RuleView = (props) => {
  const rules = useSelector((state) => state.file.value.rules);

  FilterService.register("ruleFilter", (field, filter) => {
    if (filter === null) {
      return true;
    }
    filter = filter.toLowerCase();
    if (Array.isArray(field)) {
      return field.some(
        (condition) =>
          condition.attributeName.toLowerCase().includes(filter) ||
          condition.value.toLowerCase().includes(filter)
      );
    } else if (field !== null) {
      return field.attributeName.toLowerCase().includes(filter);
    }
    return false;
  });

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: "ruleFilter" },
  });

  const updateModelService = new UpdateModelService();

  const [completeRule, setCompleteRule] = useState([]);
  const [ruleEditDialog, setRuleEditDialog] = useState({
    visible: false,
    rule: null,
  });

  useEffect(() => {
    setCompleteRule(DependencyService.getCompleteRules(rules));
  }, [rules]);

  const dispatch = useDispatch();
  const menu = useRef(null);

  useEffect(() => {
    dispatch(changeHistory("Reguły"));
  }, []);

  const menuItems = [
    {
      label: "Dodaj regułę",
      icon: "pi pi-plus",
      command: () => {
        setRuleEditDialog({
          visible: true,
          fact: null,
          newRule: true,
        });
      },
    },
  ];

  const buttons = [
    {
      icon: "pi-trash",
      className: "p-button-danger",
      tooltip: "Usuń regułę",
      tooltipPosition: "left",
      action: (rule) => {
        confirmDialog({
          position: "right",
          header: "Potwierdź usunięcie",
          message: "Czy na pewno chcesz usunąć regułę?",
          icon: "pi pi-trash",
          acceptClassName: "p-button-danger",
          acceptLabel: "Tak",
          rejectLabel: "Nie",
          style: { width: "400px" },
          accept: () => updateModelService.deleteRule(rule),
          reject: () => {},
        });
      },
    },
    {
      icon: "pi-pencil",
      className: "p-button-success",
      tooltip: "Edytuj regułę",
      tooltipPosition: "left",
      action: (rule) => {
        setRuleEditDialog({
          visible: true,
          rule: rule,
        });
      },
    },
  ];

  const renderHeader = () => {
    return (
      <div className="space-between" style={{ fontSize: "17px" }}>
        <div style={{ margin: "auto" }}>Lista Reguł</div>
        <span className="flex">
          <GlobalFilter
            value={filters.global.value}
            changeValue={(e) =>
              setFilters((prev) => ({
                ...prev,
                global: { ...prev.global, value: e },
              }))
            }
          />

          <MenuButton menuItems={menuItems} />
        </span>
      </div>
    );
  };

  const buttonsTemplates = (rule) => {
    let buttonsSection = buttons.map((b, i) => (
      <ActionIconButton
        key={`attribute-button-${i}`}
        icon={b.icon}
        className={b.className}
        tooltip={b.tooltip}
        tooltipPosition={b.tooltipPosition}
        action={() => b.action(rule)}
      />
    ));
    return (
      <div className="start-from-right" start-from-right>
        {buttonsSection}
      </div>
    );
  };

  const getConditionTemplate = (rule) => {
    return (
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {rule.conditions.map((c, i) => {
          return (
            <>
              <RuleDisplay rule={c} />
              {rule.conditions.length - 1 !== i ? (
                <AndTemplate className={"mx-2"} />
              ) : null}
            </>
          );
        })}
      </div>
    );
  };

  return (
    <>
      <DataTable
        scrollable
        scrollHeight="calc(100vh - 170px)"
        className="row-padding"
        paginator={rules.length > 0}
        rows={25}
        value={completeRule}
        header={renderHeader()}
        filters={filters}
        emptyMessage={<EmptyTableMessage value="Reguł" />}
      >
        <Column
          bodyClassName="rule-view-if-column"
          headerClassName="rule-view-if-column"
          body={(a) => <IfTemplate />}
        />

        <Column
          bodyClassName="rule-view-conditions-column"
          headerClassName="rule-view-conditions-column"
          header="Warunki"
          field="conditions"
          body={(a) => getConditionTemplate(a)}
        />
        <Column
          bodyClassName="rule-view-then-column"
          headerClassName="rule-view-then-column"
          body={() => <ThenTemplate />}
        />
        <Column
          bodyClassName="rule-view-conclusion-column"
          headerClassName="rule-view-conclusion-column"
          header="Konkluzja"
          field="conclusion"
          body={(a) => <RuleDisplay rule={a.conclusion} />}
        />
        <Column
          bodyClassName="rule-view-buttons-column"
          headerClassName="rule-view-buttons-column"
          bodyStyle={{ flex: `0 0 ${getButtonSectionWidth(buttons)}` }}
          headerStyle={{ flex: `0 0 ${getButtonSectionWidth(buttons)}` }}
          body={(f) => buttonsTemplates(f)}
        />
      </DataTable>
      <Menu model={menuItems} popup ref={menu} id="popup_menu" />
      <RuleEditDialog
        visible={ruleEditDialog.visible}
        onHide={() =>
          setRuleEditDialog({
            rule: null,
            visible: false,
            newRule: false,
          })
        }
        newRule={ruleEditDialog.newRule}
        rule={ruleEditDialog.rule}
        onSave={(e) => {
          if (ruleEditDialog.newRule) {
            updateModelService.addNewRule(e);
          } else {
            updateModelService.updateRule(e);
          }

          setRuleEditDialog({
            rule: null,
            visible: false,
            newRule: false,
          });
        }}
      />
    </>
  );
};

export default RuleView;
