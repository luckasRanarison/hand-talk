import DeleteButton from "./DeleteButton";

type Props = {
  children: React.ReactNode;
  selected: boolean;
  onSelect: () => void;
  onDelete: () => void;
};

const SelectableEntry = (props: Props) => (
  <div
    className={`flex cursor-pointer items-center justify-between
    space-x-2 rounded-md border-[1px] px-4 py-3
    hover:border-blue-600 hover:bg-gray-200 hover:text-blue-600
    dark:hover:border-blue-400 dark:hover:bg-gray-900 dark:hover:text-blue-400
    ${
      props.selected
        ? "border-blue-600 dark:border-blue-400"
        : "border-gray-300 dark:border-gray-800"
    }`}
    onClick={props.onSelect}
  >
    <span
      className={`overflow-x-hidden overflow-ellipsis whitespace-nowrap
      ${props.selected && "text-blue-600 dark:text-blue-400"}`}
    >
      {props.children}
    </span>
    <DeleteButton onClick={props.onDelete} />
  </div>
);

export default SelectableEntry;
