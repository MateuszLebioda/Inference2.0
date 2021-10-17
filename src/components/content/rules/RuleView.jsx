/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { changeHistory } from "../../../slice/HistorySlice";

const RuleView = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeHistory("Rules"));
  }, []);

  return <div>Rule</div>;
};

export default RuleView;
