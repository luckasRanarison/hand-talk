type Progress = {
  current: number;
  total: number;
};

const getPercentage = (value: Progress) =>
  Math.round((value.current / value.total) * 100);

const ProgressBar = (value: Progress) => (
  <div className="w-full">
    <div
      style={{ width: `${getPercentage(value)}%` }}
      className="rounded-sm h-1 bg-blue-600 dark:bg-blue-400"
    ></div>
  </div>
);

export default ProgressBar;
