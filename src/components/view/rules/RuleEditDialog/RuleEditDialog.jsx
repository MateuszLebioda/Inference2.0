/* eslint-disable react-hooks/exhaustive-deps */
import { Dialog } from "primereact/dialog";
import { useEffect, useState } from "react";
import FactService from "../../../../model/fact/FactService";
import RuleService from "../../../../model/rule/RuleService";
import IfTemplate from "../../../custom/IfTemplate/IfTemplate";
import OperatorDropdown from "../../../custom/OperatorDropdown/OperatorDropdown";
import PrimaryButton from "../../../custom/PrimaryButton/PrimaryButton";
import ThenTemplate from "../../../custom/ThenTemplate/ThenTemplate";
import {
  deleteButton,
  renderButton,
} from "../../../custom/ActionIconButton/ActionIconButton";
import AndTemplate from "../../../custom/AndTemplate/AndTemplate";
import "./RuleEditDialog.css";
import SecondaryActionButton from "../../../custom/SecondaryActionButton/SecondaryActionButton";
import FactAttributeDropdown from "../../../custom/FactAttributeDropdown/FactAttributeDropdown";
import FactValueDropdown from "../../../custom/FactValueDropdown/FactValueDropdown";

const RuleEditDialog = (props) => {
  const factService = new FactService();
  const ruleService = new RuleService();

  const [rule, setRule] = useState(null);

  useEffect(() => {
    if (props.rule || props.newRule) {
      let tempRule = { ...props.rule };
      if (props.newRule) {
        tempRule = ruleService.createEmptyRule();
        tempRule.conclusion = factService.createEmptyFact();
      }
      setRule(ruleService.createRuleToEdit(tempRule));
    }
  }, [props.rule, props.newRule]);

  const dialogFooter = () => {
    return (
      <div className="start-from-right ">
        <PrimaryButton
          label="Zapisz"
          icon="pi pi-save"
          onClick={() => {
            let tempRule = ruleService.mapRuleToEditToRule(rule);
            props.onSave(tempRule);
            setRule(null);
          }}
        />
        <SecondaryActionButton
          label="Dodaj nowy warunek"
          icon="pi pi-plus"
          onClick={() => {
            setRule(ruleService.addEmptyConditions(rule));
          }}
        />
      </div>
    );
  };

  const mapConclusion = (c, isConclusion, index) => {
    return (
      <>
        <FactAttributeDropdown
          noHeader
          value={c && c.attributeName}
          className="w-full"
          onChange={(newCondition) => {
            setRule((prev) => {
              return isConclusion
                ? ruleService.changeConclusion(prev, {
                    attributeName: newCondition.value,
                    attributeID: newCondition.id,
                    type: newCondition.type,
                  })
                : ruleService.changeConclusionByIndex(prev, index, {
                    attributeName: newCondition.value,
                    attributeID: newCondition.id,
                    type: newCondition.type,
                  });
            });
          }}
        />
        {isConclusion ? (
          <div className="m-auto"> = </div>
        ) : (
          <OperatorDropdown
            value={c.operator}
            onChange={(operator) => {
              setRule((prev) =>
                ruleService.changeConclusionByIndex(prev, index, {
                  operator: operator,
                })
              );
            }}
            type={c.type}
          />
        )}
        <FactValueDropdown
          type={c && c.type}
          noHeader
          value={c && c.value}
          className="w-full"
          attributeID={c && c.attributeID}
          onChange={(value) =>
            setRule((prev) =>
              isConclusion
                ? ruleService.changeConclusion(prev, { value: value })
                : ruleService.changeConclusionByIndex(prev, index, {
                    value: value,
                  })
            )
          }
        />
        {!isConclusion ? (
          renderButton(
            deleteButton(() => {
              let tempRuleConditions = rule.conditions.filter(
                (e, i) => i !== index
              );
              setRule((prev) => ({ ...prev, conditions: tempRuleConditions }));
            })
          )
        ) : (
          <div />
        )}
        {!isConclusion &&
          index !== rule.conditions.length - 1 &&
          gridTemplate(<AndTemplate className="mx-auto" />)}
      </>
    );
  };

  const gridTemplate = (template) => (
    <>
      <div></div>
      {template}
      <div></div>
      <div></div>
    </>
  );

  return (
    <Dialog
      footer={dialogFooter()}
      header="Edycja reguły"
      visible={props.visible}
      onHide={() => {
        setRule(null);
        props.onHide();
      }}
      style={{ maxWidth: "70vw", minWidth: "60vw" }}
    >
      <div className="rule-edit-grid-container">
        {gridTemplate(<IfTemplate className="mx-auto" />)}
      </div>
      <div className="rule-edit-grid-container fact-edit-conditions-panel">
        {rule && rule.conditions.map((c, i) => mapConclusion(c, false, i))}
      </div>
      <div className="rule-edit-grid-container fact-edit-conclusion-panel">
        {gridTemplate(<ThenTemplate className="mx-auto " />)}
        {mapConclusion(rule && rule.conclusion, true)}
      </div>
    </Dialog>
  );
};

export default RuleEditDialog;
