import { Dialog } from "primereact/dialog";
import { useEffect, useState } from "react";
import { inferenceType } from "../../../../model/metrics/InferenceType";
import RulePreviewDialog from "../../../view/rules/RulePreviewDialog/RulePreviewDialog";
import FactDropdown from "../../FactDropddown/FactDropdown";
import ExplainChar from "./ExplainChar/ExplainChar";

const ExplainForwardDialog = (props) => {
  const [chosenFact, setChosenFact] = useState(null);
  const [newFacts, setNewElements] = useState([]);
  const [ruleDetails, setRuleDetails] = useState({
    visible: false,
    rule: null,
  });

  useEffect(() => {
    if (props.metric) {
      setNewElements(
        props.metric.newFacts.map((f, i) => ({
          ...f,
          fact: { ...f.fact, id: i },
        }))
      );
    }
  }, [props.metric]);

  useEffect(() => {
    if (!chosenFact && newFacts) {
      setChosenFact(newFacts[0]);
    }
  }, [chosenFact, newFacts]);

  return (
    <Dialog
      visible={props.visible}
      header="Moduł objaśniający"
      onHide={() => {
        setChosenFact(null);
        setNewElements([]);
        setRuleDetails({
          visible: false,
          rule: null,
        });
        props.onHide();
      }}
    >
      <div>
        <div className="h-full my-auto mr-2">
          <strong>Wybierz fakt do objaśnienia:</strong>
        </div>
        <FactDropdown
          facts={newFacts.map((nf) => nf.fact)}
          onChange={(e) => {
            setChosenFact(newFacts.find((nf) => e.value === nf.fact.id));
          }}
          value={chosenFact ? chosenFact.fact : null}
          disabled={
            props.metric && props.metric.type === inferenceType.BACKWARD
          }
        />
      </div>

      <ExplainChar
        className="m-4"
        fact={chosenFact}
        showRuleDetails={(e) => {
          setRuleDetails({
            visible: true,
            rule: props.metric.activatedRules.find((r) => r.id === e),
          });
        }}
      />

      <RulePreviewDialog
        visible={ruleDetails.visible}
        rule={ruleDetails.rule}
        onHide={() =>
          setRuleDetails({
            visible: false,
            rule: null,
          })
        }
      />
    </Dialog>
  );
};
ExplainForwardDialog.defaultProps = {
  metric: {
    newFacts: [],
    startFact: [],
  },
};

export default ExplainForwardDialog;
