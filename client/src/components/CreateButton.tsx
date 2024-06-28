import { RiAddLine } from "react-icons/ri";

type Props = {
  disabled?: boolean;
  onClick: () => void;
};

const CreateButton = ({ onClick, disabled }: Props) => (
  <button
    disabled={disabled}
    onClick={onClick}
    className="rounded-md bg-blue-200 p-2 text-blue-800
    disabled:bg-gray-300 disabled:text-gray-600"
  >
    <RiAddLine />
  </button>
);

export default CreateButton;
