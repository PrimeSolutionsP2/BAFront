import Event from "./Event"
import es from "dayjs/locale/es"

export default function DayEvents({ events, day }) {

    return (

      

        <div className="border-2 border-solid m-10 p-5 max-w-3x mx-[20%] border-black" >
            <h2 className="text-xl text-center text-gray-500 font-bold"> Recolecciones del {day.locale(es).format("dddd DD [de] MMMM [del] YYYY  ")}  </h2>
            {
                events.length?
                    events.map((event) => {
                        return <Event key={event.id} event={event}></Event>;
                    })
                    :
                    <h2 className="text-center text-gray-500 text-xl">No hay recolecciones para este dia</h2>
            }

        </div>


    )



}