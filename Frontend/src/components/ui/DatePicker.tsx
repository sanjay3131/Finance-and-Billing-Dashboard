const DatePicker = ({
  date,
  setDate,
}: {
  date: {
    fromDate: string;
    toDate: string;
  };
  setDate: React.Dispatch<
    React.SetStateAction<{
      fromDate: string;
      toDate: string;
    }>
  >;
}) => {
  return (
    <div className="flex items-center justify-between mt-4">
      <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold">From Date</label>
        <input
          type="date"
          value={date.fromDate}
          onChange={(e) => setDate({ ...date, fromDate: e.target.value })}
          className="border border-gray-300 rounded-md px-2 py-1 w-full max-w-xs"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold">To Date</label>
        <input
          type="date"
          value={date.toDate}
          onChange={(e) => setDate({ ...date, toDate: e.target.value })}
          className="border border-gray-300 rounded-md px-2 py-1 w-full max-w-xs min-w-30"
        />
      </div>
    </div>
  );
};

export default DatePicker;
