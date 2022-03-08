import { Router, Route, Switch } from "react-router-dom";
import AttributeView from "./attribute/AttributeView";
import history from "../../services/history";
import FactView from "./fact/FactView";
import RuleView from "./rules/RuleView";
import MetricsPreview from "./metrics/MetricsPreview";
import BackwardInferenceView from "./inferenceView/BackwardInferenceView";
import ForwardInferenceView from "./inferenceView/ForwardInferenceView";
import MetricsCompare from "./metrics/metricsCompare/MetricsCompare";

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
        <Route
          path="/metrics/compare/:metricsIds?"
          component={MetricsCompare}
        />
        <Route path="/" component={AttributeView} />
      </Switch>
    </Router>
  );
};

export default Content;
