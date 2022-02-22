import { Dialog } from "primereact/dialog";
import { useEffect, useState } from "react";

const RulePreviewDialog = (props) => {
  const [charModel, setCharModel] = useState(null);

  useEffect(() => {
    if (props.rule) {
      setCharModel(mapRuleToCharModel(props.rule));
    }
  }, [props.rule]);

  const mapRuleToCharModel = (rule) => {};

  return (
    <Dialog
      visible={props.visible}
      onHide={() => {
        setCharModel(null);
        props.onHide();
      }}
    ></Dialog>
  );
};

export default RulePreviewDialog;
