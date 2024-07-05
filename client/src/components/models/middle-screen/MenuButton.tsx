import { IconType } from "react-icons/lib";

type Props = {
  icon: IconType;
  onClick: () => void;
};

const MenuButton = ({ icon: Icon, onClick }: Props) => (
  <button
    className="rounded-md border-[1px] border-blue-600 p-4
    hover:bg-gray-300 dark:border-blue-400 dark:hover:bg-gray-800"
    onClick={onClick}
  >
    <Icon size={18} className="text-blue-600 dark:text-blue-400" />
  </button>
);

export default MenuButton;
