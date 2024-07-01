import { RiDeleteBinLine } from "react-icons/ri";

const DeleteButton = (props: { onClick: () => void }) => (
  <button className="rounded-md text-red-500" onClick={props.onClick}>
    <RiDeleteBinLine />
  </button>
);

export default DeleteButton;
