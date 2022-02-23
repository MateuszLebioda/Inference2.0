import { Router, Route, Switch } from "react-router-dom";
import AttributeView from "./attribute/AttributeView";
import history from "../../services/history";
import FactView from "./fact/FactView";
import RuleView from "./rules/RuleView";
import MetricsPreview from "../view/Metrics/MetricsPreview";
import BackwardInferenceView from "../view/InferenceView/BackwardInferenceView";
import ForwardInferenceView from "../view/InferenceView/ForwardInferenceView";

const Content = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/attributes" component={AttributeView} />
        <Route path="/facts" component={FactView} />
        <Route path="/rules" component={RuleView} />
        <Route path="/inference/forward" component={ForwardInferenceView} />
        <Route path="/inference/backward" component={BackwardInferenceView} />
        <Route path="/metrics/preview" component={MetricsPreview} />
        <Route path="/" component={AttributeView} />
      </Switch>
    </Router>
  );
};

export default Content;
