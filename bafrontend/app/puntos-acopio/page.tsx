import CollectionPointCard from "@/components/CollectionPointCard";
import CollectionPointModal from "@/components/CollectionPointModal";
import FilterBar from "@/components/FilterBar";
import StateCard from "@/components/StateCard";
import TitleBar from "@/components/TitleBar";
import { PuntoAcopio, getCollectionPoints} from "utils/collectionPoint/collectionPoint.service";
import CollectionPoints from "./CollectionPoints";


export default async function PuntosAcopio() {



    let puntosAcopio = await getCollectionPoints();

    



    return (
        <>
            <TitleBar title={"Puntos de acopio"} />
            <div className="p-5">
                <CollectionPoints puntosAcopio={puntosAcopio}></CollectionPoints>
            </div>
        </>
    )
}