import { inferenceType } from "./InferenceType";
import { Metrics } from "./Metrics";

export class BackwardMetrics extends Metrics {
  constructor(name, color, facts, goal) {
    super(name, color, facts, goal);
    this.type = inferenceType.BACKWARD;
    this.indirectHypothesis = [];
  }

  addIndirectHypothesis = (rule) => {
    this.indirectHypothesis.push({ ...rule });
    this.incrementCheckedRules();
  };

  toPojo() {
    return { ...super.toPojo(), indirectHypothesis: this.indirectHypothesis };
  }
}
