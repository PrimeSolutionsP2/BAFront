'use client';
import Calendar from "@/components/Calendar";
import DayEvents from "@/components/DayEvents";
import TitleBar from "@/components/TitleBar";
import dayjs from "dayjs";
import { useState } from "react";


interface IEvent{
    id : number;
    collectionPointName: string;
    dateTimeString : string;
    weight:number;
}

const events: IEvent[] = [
    {
        id: 1,
        collectionPointName: "Point A",
        dateTimeString: "2024-03-31 14:30:00", // Example datetime
        weight: 12.5,
    },
    {
        id: 2,
        collectionPointName: "Point B",
        dateTimeString: "2024-03-31 15:45:00", // Example datetime
        weight: 8.2,
    },
    {
        id: 3,
        collectionPointName: "Point C",
        dateTimeString: "2024-03-31 16:20:00", // Example datetime
        weight: 10.0,
    },
    {
        id: 4,
        collectionPointName: "Point D",
        dateTimeString: "2024-03-31 17:05:00", // Example datetime
        weight: 15.7,
    },
    {
        id: 5,
        collectionPointName: "Point E",
        dateTimeString: "2024-03-31 18:15:00", // Example datetime
        weight: 9.8,
    },
    {
        id: 6,
        collectionPointName: "Point F",
        dateTimeString: "2024-03-31 19:40:00", // Example datetime
        weight: 11.2,
    },
    {
        id: 7,
        collectionPointName: "Point G",
        dateTimeString: "2024-03-31 20:55:00", // Example datetime
        weight: 13.4,
    },
    {
        id: 8,
        collectionPointName: "Point H",
        dateTimeString: "2024-03-31 21:30:00", // Example datetime
        weight: 7.5,
    },
    {
        id: 9,
        collectionPointName: "Point I",
        dateTimeString: "2024-03-31 22:10:00", // Example datetime
        weight: 14.0,
    },
    {
        id: 10,
        collectionPointName: "Point J",
        dateTimeString: "2024-03-31 23:25:00", // Example datetime
        weight: 10.5,
    },
    {
        id:20,
        collectionPointName: "Point Lean",
        dateTimeString : "2024-02-20 12:25:00",
        weight:10.5,
    }
];

export default function Page(){

    const [selectedDay, setSelectedDay] = useState(dayjs());

    const filteredEvents = events.filter((event) => {
        let day = dayjs(event.dateTimeString);
        return (day.date() == selectedDay.date() && day.month() == selectedDay.month() && day.year() == selectedDay.year())
    })

    return(
        <>
        <TitleBar title={"Recolecciones"} />
        <Calendar events={events} onDaySelected={setSelectedDay}></Calendar>
        <DayEvents events={filteredEvents} day={selectedDay}></DayEvents>
        </>
    )
}