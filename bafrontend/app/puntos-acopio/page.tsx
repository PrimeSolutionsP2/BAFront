import CollectionPointCard from "@/components/CollectionPointCard";
import FilterBar from "@/components/FilterBar";
import StateCard from "@/components/StateCard";
import TitleBar from "@/components/TitleBar";
import { PuntoAcopio, getCollectionPoints} from "utils/collectionPoint/collectionPoint.service";



export default async function PuntosAcopio() {
    let puntosAcopio = await getCollectionPoints();
    return (
        <>
            <TitleBar title={"Puntos de acopio"} />
            <div className="p-5">
            <FilterBar></FilterBar>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {puntosAcopio.map((puntoAcopio) => (
                        <CollectionPointCard collectionPoint={puntoAcopio}></CollectionPointCard>
                    ))}
            </div>
            </div>
        </>
    )
}