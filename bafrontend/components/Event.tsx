import dayjs from "dayjs";



export default function Event({event}) {

    return (
        <div className="rounded-md shadow-sm bg-slate-200">

            <div className="m-5">

            
            <div className="w-[50%]">
                {event.collectionPointName}
            </div>

            <div>
                Hora: {dayjs(event.dateTimeString).format("h:mm a")}
            </div>
            <div>
                Total Residuos : {event.weight} kilogramos
            </div>
            </div>
        </div>
    )
}