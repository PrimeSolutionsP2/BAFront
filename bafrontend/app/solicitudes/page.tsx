
import TitleBar from "@/components/TitleBar";
import { getCollectionPointRequests } from "utils/collectionPoint/collectionPoint.service";
import CollectionPoints from "../puntos-acopio/CollectionPoints";
import CollectionPointRequests from "./collectionPointRequests";


export default async function SolicitudesPuntosAcopio() {

    

    let elements = await getCollectionPointRequests();
    

    return (
        <>
            <TitleBar title={"Solicitudes pendientes"} />
            <div className="p-5">
                <CollectionPointRequests puntosAcopio={elements}></CollectionPointRequests>
            </div>
        </>
    )
}