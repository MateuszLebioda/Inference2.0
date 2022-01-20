import { Dialog } from "primereact/dialog";
import { useState } from "react";
import FactDropdown from "../../FactDropddown/FactDropdown";
import ExplainChar from "./ExplainChar/ExplainChar";

const ExplainForwardDialog = (props) => {
  const [chosenFact, setChosenFact] = useState(null);

  const getAllFacts = () => {
    return [...props.metric.newFacts, ...props.metric.startFacts];
  };

  return (
    <Dialog
      visible={props.visible}
      header="Moduł objaśniający"
      onHide={() => {
        setChosenFact(null);
        props.onHide();
      }}
    >
      <FactDropdown
        facts={props.metric && props.metric.newFacts.map((f) => f.fact)}
        onChange={(e) => {
          setChosenFact(getAllFacts().find((f) => f.fact.id === e.value));
        }}
        value={chosenFact ? chosenFact.fact : null}
      />
      <ExplainChar
        className="m-4"
        fact={
          chosenFact
            ? getAllFacts().find((f) => f.fact.id === chosenFact.fact.id)
            : null
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
