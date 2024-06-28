import { RiDeleteBinLine } from "react-icons/ri";

const DeleteButton = (props: { onClick: () => void }) => (
  <button
    className="rounded-md bg-red-200 p-2 text-red-500"
    onClick={props.onClick}
  >
    <RiDeleteBinLine />
  </button>
);

export default DeleteButton;
