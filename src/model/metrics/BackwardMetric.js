import { inferenceType } from "./InferenceType";
import { Metrics } from "./Metrics";

export class BackwardMetrics extends Metrics {
  constructor(name, color, facts, goal, matchingStrategy) {
    super(name, color, facts, goal, matchingStrategy);
    this.name =
      name === "" ? `${this.id + 1}. W tył: ${matchingStrategy.name}` : name;

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
