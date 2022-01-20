/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useState } from "react";
import { OrganizationChart } from "primereact/organizationchart";
import DependencyService from "../../../../../services/dependency/DependencyService";
import "./ExplainChar.css";

const ExplainChar = (props) => {
  const [charModel, setCharModel] = useState(null);

  useEffect(() => {
    if (props.fact) {
      setCharModel(mapForwardExplainModelToCharModel(props.fact));
    }
  }, [props.fact]);

  const mapForwardExplainModelToCharModel = (fact) => {
    let factDetails = {
      ...DependencyService.getCompleteFact(fact.fact),
      ruleId: fact.rule ? fact.rule.ruleId : -1,
    };
    let children = fact.rule
      ? fact.rule.conditions.map((f) => mapForwardExplainModelToCharModel(f))
      : [];
    return {
      ...factDetails,
      expanded: true,
      children: children,
    };
  };
  if (!charModel) {
    return null;
  }

  const nodeTemplate = (e) => {
    return (
      <div className="node-explain-char-template">
        <div className="node-explain-char-header">
          <div
            style={
              e.type === "SYMBOLIC"
                ? {
                    background: "var(--symbolic-template-background)",
                    color: "var(--symbolic-template-color)",
                  }
                : {
                    background: "var(--continous-template-background)",
                    color: "var(--continous-template-color)",
                  }
            }
            className="p-2"
          >
            <strong>{e.type}</strong>
          </div>
          <div className="flex p-2">
            <div className="my-auto m-2">{e.attributeName}</div>
            <div className="my-auto m-2">{e.operator}</div>
            <div className="my-auto m-2">{e.value}</div>
          </div>
        </div>
        {e.ruleId !== -1 ? (
          <div className="m-2 mb-3">
            Na podstawie reguły numer: <strong>{e.ruleId}</strong>
          </div>
        ) : (
          <div className="m-2">
            <strong>Dana przesłanka jest faktem</strong>
          </div>
        )}
      </div>
    );
  };

  return (
    <OrganizationChart
      value={[charModel]}
      nodeTemplate={nodeTemplate}
      className={`explain-char-container ${props.className}`}
    />
  );
};

export default ExplainChar;
