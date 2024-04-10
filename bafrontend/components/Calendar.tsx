"use client";

import dayjs from "dayjs";
import Month from "./Month";
import {getMonth} from "utils/calendar/utils"
import { useEffect, useState } from "react";
import es  from "dayjs/locale/es";


export default function Calendar({events,onDaySelected}){




    const [currentMonth, setCurrentMonth] = useState(getMonth());
    const [monthIndex,setMonthIndex] = useState(dayjs().month());   

    useEffect(() => {
        setCurrentMonth(getMonth(monthIndex));
      }, [monthIndex]);

    return (<div>
        <CalendarHeader monthIndex={monthIndex} setMonthIndex={setMonthIndex}></CalendarHeader>
        <Month events={events} onDaySelected={onDaySelected} month={currentMonth}/>
    </div>)
}


function CalendarHeader({monthIndex, setMonthIndex}){

    function handlePrevMonth() {
        setMonthIndex(monthIndex - 1);
      }
      function handleNextMonth() {
        setMonthIndex(monthIndex + 1);
    }

    function handleReset(){
        setMonthIndex(dayjs().month());
    }

    return(
        <>
        <button onClick={handleReset}
          className="border rounded py-2 px-4 mr-5"
        >
          Today
        </button>
        <button onClick={handlePrevMonth}>
          <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
           {"<"}
          </span>
        </button>
        <button onClick={handleNextMonth}>
          <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
            {">"}
          </span>
        </button>
        <span className="ml-4 text-xl text-gray-500 font-bold">
          {dayjs(new Date(dayjs().year(), monthIndex)).locale(es).format(
            "MMMM  YYYY"
          )}
        </span>
        </>
    )
}