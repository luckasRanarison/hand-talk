import { IconType } from "react-icons/lib";

type Props = {
  icon: IconType;
  label: string;
  value: string;
};

const Metadata = ({ icon: Icon, label, value }: Props) => (
  <div className="flex items-center space-x-2">
    <Icon />
    <div className="overflow-x-hidden text-ellipsis">
      <span>{label}: </span>
      <span className="opacity-70">{value}</span>
    </div>
  </div>
);

export default Metadata;
