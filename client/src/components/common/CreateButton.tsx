import { RiAddLine } from "react-icons/ri";

type Props = {
  disabled?: boolean;
  onClick: () => void;
};

const CreateButton = ({ onClick, disabled }: Props) => (
  <button
    disabled={disabled}
    onClick={onClick}
    className="rounded-md text-blue-600 disabled:text-gray-600"
  >
    <RiAddLine size={20} />
  </button>
);

export default CreateButton;
