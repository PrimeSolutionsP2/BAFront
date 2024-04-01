import dayjs from "dayjs";


export default function Day({ day, rowIdx, onSelected, hasEvents }) {


  function getCurrentDayClass() {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "bg-blue-600 text-white rounded-full w-7"
      : "";
  }

  return (
    <button onClick={onSelected} className="border border-gray-200 flex flex-col items-center">
      {hasEvents ? <span className="mt-3 dot"></span> : "" }
      <header className="flex flex-col items-center">
        {rowIdx === 0 && (
          <p className="text-sm mt-1">
            {day.format("ddd").toUpperCase()}
          </p>
        )}
        <p
          className={`text-sm p-1 my-1 text-center  ${getCurrentDayClass()}`}
        >
          {day.format("DD")}
        </p>
      </header>
      
      <div
        className="flex-1 cursor-pointer"
      >
      </div>
    </button>
  );
}