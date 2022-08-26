import { inferenceType } from "./InferenceType";
import { Metrics } from "./Metrics";

export class ForwardMetrics extends Metrics {
  constructor(name, color, facts, goal, matchingStrategy) {
    super(name, color, facts, goal, matchingStrategy);
    this.name =
      name === "" ? `${this.id + 1}. W przód: ${matchingStrategy.name}` : name;
    this.type = inferenceType.FORWARD;
  }

  iterations = 0;

  incrementIterations = () => {
    this.iterations = this.iterations + 1;
  };

  toPojo() {
    return { ...super.toPojo(), iterations: this.iterations };
  }
}
