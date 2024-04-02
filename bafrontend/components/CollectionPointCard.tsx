import {PuntoAcopio} from "app/puntos-acopio/page"
import StateCard from "./StateCard";

export default function CollectionPointCard({collectionPoint} : { collectionPoint:PuntoAcopio } ){
    function chooseColor(estado: any): string {
        switch (estado) {
            case "Activo":
                return "green"
                break;
            case "Inactivo":
                return "red"
            default:
                return "gray"
            break;
        }
    }

    return (
        <div className="bg-white rounded-xl p-6 w-full mx-auto shadow-lg text-center transition duration-300 transform hover:scale-105">

          <p className="text-lg font-semibold">{collectionPoint.nombre}</p>

          <p className="m-2">{collectionPoint.departamento +", "+collectionPoint.pais}</p>
          <StateCard className="rounded-md text-center" color={chooseColor(collectionPoint.estado)} statusString={collectionPoint.estado} ></StateCard>
        </div>
      );
    }