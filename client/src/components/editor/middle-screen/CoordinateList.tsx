const CoordinateList = (props: { value: number[] }) =>
  props.value.every((value) => value == 0) ? (
    <div
      className="w-fit rounded-md border-[1px] border-red-500 px-4 py-2
      text-red-500 dark:border-red-400 dark:text-red-400"
    >
      Not detected
    </div>
  ) : (
    <div className="grid grid-cols-3 gap-4">
      {props.value.map((value, index) => (
        <div
          key={index}
          className="flex overflow-x-hidden text-ellipsis rounded-md 
          border-[1px] border-gray-300 px-4 py-3
          text-sm font-semibold dark:border-gray-800"
        >
          {value}
        </div>
      ))}
    </div>
  );

export default CoordinateList;
