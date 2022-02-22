import { inferenceType } from "./InferenceType";
import { Metrics } from "./Metrics";

export class ForwardMetrics extends Metrics {
  constructor(name, color, facts) {
    super(name, color, facts);
    this.type = inferenceType.FORWARD;
  }
}
