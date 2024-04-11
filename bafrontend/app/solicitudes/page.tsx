
import TitleBar from "@/components/TitleBar";
import { getCollectionPointRequests } from "utils/collectionPoint/collectionPoint.service";
import CollectionPoints from "../puntos-acopio/CollectionPoints";


export default async function SolicitudesPuntosAcopio() {

    

    let elements = await getCollectionPointRequests();
    

    return (
        <>
            <TitleBar title={"Solicitudes de creación de punto de acopio"} />
            <div className="p-5">
                <CollectionPoints puntosAcopio={elements}></CollectionPoints>
            </div>
        </>
    )
}