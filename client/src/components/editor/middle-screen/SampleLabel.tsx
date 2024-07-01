import { IconType } from "react-icons/lib";

type Props = {
  icon: IconType;
  text: string;
};

const SampleLabel = ({ icon: Icon, text }: Props) => (
  <div
    className="flex items-center space-x-3
    font-semibold"
  >
    <Icon size={22} />
    <span>{text}</span>
  </div>
);

export default SampleLabel;
