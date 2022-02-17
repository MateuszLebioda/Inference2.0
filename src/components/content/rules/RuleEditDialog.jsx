/* eslint-disable react-hooks/exhaustive-deps */
import { Dialog } from "primereact/dialog";
import { useEffect, useState } from "react";
import IfTemplate from "../../custom/IfTemplate/IfTemplate";
import ThenTemplate from "../../custom/ThenTemplate/ThenTemplate";
import RuleService from "../../../model/rule/RuleService";
import IdService from "../../../services/IdService";
import FactService from "../../../model/fact/FactService";
import ConditionsTable from "../../custom/ConditionsTable/ConditionsTable";
import AndTemplate from "../../custom/AndTemplate/AndTemplate";
import PrimaryButton from "../../custom/PrimaryButton/PrimaryButton";

const RuleEditDialog = (props) => {
  const [tempRule, setTempRule] = useState(null);

  useEffect(() => {
    if (props.rule || props.newRule) {
      let tempRule = { ...props.rule };
      if (props.newRule) {
        tempRule = ruleService.createEmptyRule();
        tempRule.conclusion = factService.createEmptyFact();
      }
      setTempRule(ruleService.createRuleToEdit(tempRule));
    }
  }, [props.rule, props.newRule]);

  const factService = new FactService();
  const ruleService = new RuleService();

  const conclusionMenuItems = [
    {
      label: "Dodaj warunek",
      icon: "pi pi-plus",
      command: () => {
        if (tempRule.conditions) {
          setTempRule((prev) => {
            let tempRule = { ...prev };
            tempRule.conditions = tempRule.conditions.concat(
              factService.getFactToEdit(
                factService.createEmptyFact(
                  IdService.getNextConditionIdToTempElement(tempRule.conditions)
                )
              )
            );
            return tempRule;
          });
        }
      },
    },
    {
      label: "Przywróć warunki",
      icon: "pi pi-undo",
      command: () => {
        let tempConditions = ruleService.createConditionsToEdit(props.rule);
        setTempRule({ ...tempRule, conditions: tempConditions });
      },
    },
  ];

  const conditionButtons = [
    {
      icon: "pi-undo",
      tooltip: "Przywróć wartość",
      tooltipPosition: "left",
      action: () => {
        let tempConclusion = ruleService.createConclusionToEdit(props.rule);
        setTempRule({ ...tempRule, conclusion: tempConclusion });
      },
    },
  ];

  const conclusionButtons = conditionButtons.concat([
    {
      icon: "pi-trash",
      className: "p-button-danger",
      tooltip: "Usuń warunek",
      tooltipPosition: "left",
      action: (c, i) => {
        console.log(i);
        setTempRule((prev) => {
          let temp = { ...prev };
          temp.conditions = temp.conditions.filter((e) => e.id !== c.id);
          return temp;
        });
      },
    },
  ]);

  const dialogFooter = () => {
    return (
      <div className="start-from-right ">
        <PrimaryButton
          label="Zapisz"
          icon="pi pi-save"
          onClick={() => {
            let rule = ruleService.mapRuleToEditToRule(tempRule);
            props.onSave(rule);
            setTempRule(null);
          }}
        />
      </div>
    );
  };

  return (
    <Dialog
      footer={dialogFooter()}
      header="Edycja reguły"
      visible={props.visible}
      onHide={() => {
        setTempRule(null);
        props.onHide();
      }}
      style={{ width: "80vw", minWidth: "1200px" }}
    >
      <div className="flex">
        <IfTemplate className="my-auto mr-3" />
        <ConditionsTable
          scrollHeight="350px"
          header={
            <div className="flex justify-content-center">
              <div>
                Warunki połączone spójnikiem <AndTemplate className="ml-3" />
              </div>
            </div>
          }
          conditions={tempRule && tempRule.conditions}
          menuItems={conclusionMenuItems}
          buttons={conclusionButtons}
          changeValue={(value, condition) => {
            setTempRule(
              ruleService.changeConditionValue(tempRule, condition, value)
            );
          }}
          changeName={(newCondition, oldCondition) => {
            setTempRule(
              ruleService.changeConditionName(
                tempRule,
                oldCondition,
                newCondition
              )
            );
          }}
          changeOperator={(operator, condition) => {
            setTempRule(
              ruleService.changeConditionOperator(tempRule, condition, operator)
            );
          }}
        />
        <ThenTemplate className="my-auto mx-3" />
        <ConditionsTable
          disableOperationChange
          header={
            <div className="flex justify-content-center">
              <div>Konkluzja</div>
            </div>
          }
          conditions={tempRule && [tempRule.conclusion]}
          buttons={conditionButtons}
          changeName={(e, a) => {
            setTempRule({
              ...tempRule,
              conclusion: {
                ...tempRule.conclusion,
                attributeName: e.value,
                attributeID: e.id,
                type: e.type,
                value: null,
              },
            });
          }}
          changeValue={(e) => {
            setTempRule({
              ...tempRule,
              conclusion: { ...tempRule.conclusion, value: e },
            });
          }}
        />
      </div>
    </Dialog>
  );
};

export default RuleEditDialog;
