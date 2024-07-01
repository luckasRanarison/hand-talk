import { MdWavingHand } from "react-icons/md";
const Home = () => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <div className="flex flex-col items-center text-slate-700 space-y-6">
        <MdWavingHand size={60} />
        <div className="text-4xl">HandTalk</div>
      </div>
    </div>
  );
};

export default Home;
