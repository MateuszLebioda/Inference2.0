/* eslint-disable react-hooks/exhaustive-deps */
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
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
import IfTemplate from "../../custom/IfTemplate/IfTemplate";
import ThenTemplate from "../../custom/ThenTemplate/ThenTemplate";
import RuleDisplay from "./RuleDisplay";
import RuleEditDialog from "./RuleEditDialog";
import "./RuleView.css";

const RuleView = (props) => {
  const rules = useSelector((state) => state.file.value.rules);

  const updateModelService = new UpdateModelService();

  const [globalFilter, setGlobalFilter] = useState("");
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
      label: "Dodaj fakt",
      icon: "pi pi-plus",
    },
  ];

  const buttons = [
    {
      icon: "pi-trash",
      className: "p-button-danger",
      tooltip: "Usuń fakt",
      tooltipPosition: "left",
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
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            type="search"
            onInput={(e) => setGlobalFilter(e.target.value)}
            placeholder="Wyszukaj..."
          />

          <ActionIconButton
            tooltip="Więcej..."
            icon="pi-ellipsis-v"
            className="p-button-secondary"
            action={(event) => menu.current.toggle(event)}
          />
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
        globalFilter={globalFilter}
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
          body={(a) => getConditionTemplate(a)}
        />
        <Column
          bodyClassName="rule-view-then-column"
          headerClassName="rule-view-then-column"
          body={(a) => <ThenTemplate />}
        />
        <Column
          bodyClassName="rule-view-conclusion-column"
          headerClassName="rule-view-conclusion-column"
          header="Konkluzja"
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
          })
        }
        rule={ruleEditDialog.rule}
        onSave={(e) => {
          delete e.attributeName;

          if (ruleEditDialog.newFact) {
            // updateModelService.addNewFact(e);
          } else {
            updateModelService.updateRule(e);
          }

          setRuleEditDialog({
            rule: null,
            visible: false,
            newFact: false,
          });
        }}
      />
    </>
  );
};

export default RuleView;
