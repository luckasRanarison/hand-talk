type Props = {
  children: React.ReactNode;
  onClick?: () => void;
};

const PopupWrapper = ({ children, onClick }: Props) => (
  <div
    className="fixed inset-0 z-50 flex
    h-screen w-screen items-center justify-center
    bg-gray-950 bg-opacity-95"
    onClick={onClick}
  >
    {children}
  </div>
);

export default PopupWrapper;
