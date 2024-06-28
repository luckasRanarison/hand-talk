import { RiHand } from "react-icons/ri";

const Navbar = () => {
  return (
    <div
      className="flex items-center space-x-2
      border-b-[1px] border-b-gray-300 px-8 py-5
      text-xl font-semibold text-blue-500"
    >
      <RiHand size={24} />
      <span>HandTalk</span>
    </div>
  );
};

export default Navbar;
