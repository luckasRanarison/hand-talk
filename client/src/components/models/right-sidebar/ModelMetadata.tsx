import {
  RiBarChartFill,
  RiCalendarScheduleFill,
  RiListCheck,
  RiStackFill,
  RiToolsFill,
} from "react-icons/ri";
import LabeledInfo from "./LabeledInfo";

const ModelMetadata = ({ data }: Record<string, any>) => (
  <div className="flex flex-col space-y-2">
    <LabeledInfo
      icon={RiCalendarScheduleFill}
      label="Created at"
      value={data.metadata.date_saved}
    />
    <LabeledInfo
      icon={RiStackFill}
      label="Batch"
      value={data.config.compile_config.steps_per_execution}
    />
    <LabeledInfo
      icon={RiToolsFill}
      label="Optimizer"
      value={data.config.compile_config.optimizer}
    />
    <LabeledInfo
      icon={RiBarChartFill}
      label="Loss"
      value={data.config.compile_config.loss}
    />
    <LabeledInfo
      icon={RiListCheck}
      label="Labels"
      value={data.labels.join(", ")}
    />
  </div>
);

export default ModelMetadata;
