import { PuntoAcopio } from "app/puntos-acopio/page"
import StateCard from "./StateCard";
import { chooseColor } from "utils/collectionPoint/utils";


export default function CollectionPointCard({ collectionPoint, showStatus
}: { collectionPoint: PuntoAcopio, showStatus: boolean }) {


  return (
    <div className="bg-white rounded-xl p-6 w-full mx-auto shadow-lg text-center transition duration-300 transform hover:scale-105">

      <p className="text-lg font-semibold">{collectionPoint.nombre}</p>

      <p className="m-2">{collectionPoint.departamento + ", " + collectionPoint.pais}</p>

      {showStatus ? <StateCard className="rounded-md text-center" color={chooseColor(collectionPoint.estado)} statusString={collectionPoint.estado} ></StateCard>
        : ""}
    </div>
  );
}