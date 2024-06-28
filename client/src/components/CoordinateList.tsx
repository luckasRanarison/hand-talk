const CoordinateList = (props: { value: number[] }) =>
  props.value.every((value) => value == 0) ? (
    <div
      className="w-fit rounded-md border-[1px] border-red-500 px-4 py-2
      text-red-500"
    >
      Not detected
    </div>
  ) : (
    <div className="grid grid-cols-3 gap-4">
      {props.value.map((value, index) => (
        <div
          key={index}
          className="flex overflow-ellipsis rounded-md 
            border-[1px] border-gray-300 px-4 py-3
            text-sm font-semibold text-slate-700"
        >
          {value}
        </div>
      ))}
    </div>
  );

export default CoordinateList;
