import { Dialog } from "primereact/dialog";
import AndTemplate from "../../../custom/AndTemplate/AndTemplate";
import IfTemplate from "../../../custom/IfTemplate/IfTemplate";
import ThenTemplate from "../../../custom/ThenTemplate/ThenTemplate";
import "../RuleEditDialog/RuleEditDialog.css";

const RulePreviewDialog = (props) => {
  const gridTemplate = (template) => (
    <>
      <div></div>
      {template}
      <div></div>
    </>
  );

  const mapConclusion = (c, isConclusion, index) => {
    return (
      <>
        <div className="w-full">{c.name}</div>
        <div className="m-auto"> {c.operator} </div>
        <div className="w-full text-right">{c.value}</div>
        {!isConclusion &&
          index !== props.rule.conditions.length - 1 &&
          gridTemplate(<AndTemplate className="mx-auto" />)}
      </>
    );
  };

  return (
    props.visible && (
      <Dialog
        header="Podgląd reguły"
        visible={props.visible}
        onHide={() => {
          props.onHide();
        }}
      >
        <div className="rule-edit-grid-container-display">
          {gridTemplate(<IfTemplate className="mx-auto" />)}
        </div>
        <div className="rule-edit-grid-container-display fact-edit-conditions-panel">
          {props.rule &&
            props.rule.conditions.map((c, i) => mapConclusion(c, false, i))}
        </div>
        <div className="rule-edit-grid-container-display fact-edit-conclusion-panel">
          {gridTemplate(<ThenTemplate className="mx-auto " />)}
          {mapConclusion(props.rule && props.rule.conclusion, true)}
        </div>
      </Dialog>
    )
  );
};

export default RulePreviewDialog;
