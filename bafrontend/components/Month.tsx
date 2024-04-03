import { Key } from "react";
import Day from "./Day";
import dayjs, { Dayjs } from "dayjs";
import { IEvent } from "app/recolecciones/page";

export default function Month({events,month,onDaySelected}){
    
  function anyEventsInDay(events:IEvent[] , day: Dayjs): boolean {
      return(events.find((event:IEvent) => {
        let eventDay = dayjs(event.dateTimeString);
        return eventDay.date() == day.date() && eventDay.month() == day.month() && eventDay.year() == day.year()
      }) != undefined)

  }

    return (
        <div className="flex-1 grid grid-cols-7 grid-rows-5">
          {month.map((row: any, i: any) => (
              row.map((day: any, idx: Key | null | undefined) => (
                <Day hasEvents={anyEventsInDay(events,day)} onSelected={() => onDaySelected(day)}  day={day} key={idx} rowIdx={i} />
              ))
          ))}
        </div>
      );
}