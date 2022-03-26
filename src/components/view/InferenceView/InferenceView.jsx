/* eslint-disable react-hooks/exhaustive-deps */
import { BlockUI } from "primereact/blockui";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { ORDER_MATCH_STRATEGY } from "../../../services/inference/ruleMatchingStrategies/RuleMatchingStategies";
import { changeHistory } from "../../../slice/HistorySlice";
import EmptyFunctionsList from "../../custom/EmptyFunctionsList/EmptyFunctionsList";
import FloatInput from "../../custom/FloatInput/FloatInput";
import PrimaryButton from "../../custom/PrimaryButton/PrimaryButton";
import ColorPickerTemplate from "./ColorPicker";
import FactPicker from "./FactPicker";
import GoalPicker from "./GoalPicker";
import MatchStrategyPicker from "./MatchStrategyPicker";

const InferenceView = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const facts = useSelector((state) => state.file.value.facts);
  const rules = useSelector((state) => state.file.value.rules);
  const attributes = useSelector((state) => state.file.value.attributes);
  const [selectedFacts, setSelectedFacts] = useState([]);
  const [name, setName] = useState("");
  const [allFacts, setAllFacts] = useState(true);
  const [goal, setGoal] = useState(null);
  const [withoutGoal, setWithoutGoal] = useState(true);
  const [matchingStrategy, setMatchingStrategy] =
    useState(ORDER_MATCH_STRATEGY);

  const [color, setColor] = useState({
    random: true,
    value: null,
  });

  const headerWidth = "w-10rem";

  useImperativeHandle(ref, () => ({
    resetState() {
      setName("");
      setAllFacts(true);
      setColor({
        random: true,
        value: null,
      });
    },
  }));

  useEffect(() => {
    setGoal(null);
  }, [facts, rules, attributes]);

  useEffect(() => {
    dispatch(changeHistory(props.historyMessage));
  }, []);

  if (facts.length === 0) {
    return <EmptyFunctionsList className="m-auto mt-5" />;
  }

  return (
    <BlockUI
      blocked={props.blocking}
      fullScreen
      template={
        <div>
          <i className="pi pi-spin pi-spinner" style={{ fontSize: "3em" }} />
          Wnioskuję ...
        </div>
      }
    >
      <div className="p-formgroup-inline m-3">
        <div className="flex w-full mt-5">
          <h5 className="text-xl my-auto w-5rem">Nazwa:</h5>
          <FloatInput
            className="my-auto w-full pl-2"
            label="Nazwa metryki"
            value={name}
            onChange={(e) => setName(e)}
          />
        </div>

        <ColorPickerTemplate
          random={color.random}
          color={color.value}
          setColor={(e) => {
            setColor((prev) => ({ ...prev, value: e }));
          }}
          setRandom={(e) => {
            setColor((prev) => ({
              ...prev,
              random: e,
              value: e ? null : prev.value,
            }));
          }}
          headerWidth={headerWidth}
        />
        <FactPicker
          all={allFacts}
          setAll={(e) => setAllFacts(e)}
          selectedFacts={selectedFacts}
          onSelect={(e) => setSelectedFacts(e)}
        />
        <GoalPicker
          goal={goal}
          setGoal={setGoal}
          withoutGoal={withoutGoal}
          setWithoutGoal={(e) => setWithoutGoal(e)}
          mandatory={props.goalMandatory}
        />
        <MatchStrategyPicker
          value={matchingStrategy}
          onChange={(e) => setMatchingStrategy(e.value)}
        />
        <div className="flex justify-content-end mt-3">
          <PrimaryButton
            label="Rozpocznij"
            icon="pi pi-cog"
            onClick={() => {
              props.block();
              setTimeout(() => {
                props.onInferenceStart(
                  name,
                  color.value,
                  !allFacts && selectedFacts,
                  goal,
                  matchingStrategy
                );
              }, 100);
            }}
          />
        </div>
      </div>
    </BlockUI>
  );
});

export default InferenceView;
