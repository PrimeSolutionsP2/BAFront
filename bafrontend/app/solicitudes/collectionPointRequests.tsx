"use client"

import CollectionPointCard from "@/components/CollectionPointCard";
import CollectionPointModal from "@/components/CollectionPointModal";
import FilterBar from "@/components/FilterBar";
import { CollectionPointfilterParams } from "app/puntos-acopio/CollectionPoints";
import { UserContext } from "context/UserContext";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { PuntoAcopio, updateCollectionPointStatus, userFilter } from "utils/collectionPoint/collectionPoint.service";


export default function CollectionPoints({ puntosAcopio }: { puntosAcopio: PuntoAcopio[] }) {

    const { user } = useContext(UserContext);

    const router = useRouter();

    const [collectionPointfilterParams, setCollectionFilterParams] = useState<CollectionPointfilterParams>({ name: "", country: "", state: "", city: "", address: "", agreement: "", status: "" });

    const handleOpenNewsletterModal = (modalCollectionPoint: PuntoAcopio) => {
        setModalCollectionPoint(modalCollectionPoint)
        setIsCollectionModalOpen(true);
    };

    const handleCloseNewsletterModal = () => {
        setIsCollectionModalOpen(false);
    };

    if (user?.id == "0"){
        router.push("/user/login")
      }
    
      if(user?.type == "RECOLECTOR"){
        router.push("/")
      }

      
    const [isCollectionModalOpen, setIsCollectionModalOpen] = useState(false);

    const [modalCollectionPoint, setModalCollectionPoint] = useState(puntosAcopio);


    return (
        <>


            <FilterBar filterParams={collectionPointfilterParams} setFilterParams={setCollectionFilterParams}></FilterBar>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">

                {puntosAcopio.
                    filter((puntoAcopio: PuntoAcopio) => {
                        return puntoAcopio.nombre.toLowerCase().includes(collectionPointfilterParams.name.toLowerCase())
                            && puntoAcopio.ciudad.toLowerCase().includes(collectionPointfilterParams.city.toLowerCase())
                            && puntoAcopio.pais.toLowerCase().includes(collectionPointfilterParams.country.toLowerCase())
                            && puntoAcopio.direccion.toLowerCase().includes(collectionPointfilterParams.address.toLowerCase())
                            && puntoAcopio.departamento.toLowerCase().includes(collectionPointfilterParams.state.toLowerCase())
                            && puntoAcopio.convenio?.toLowerCase().includes(collectionPointfilterParams.agreement.toLowerCase())
                            && puntoAcopio.estado.toLowerCase().includes(collectionPointfilterParams.status.toLowerCase())
                            && userFilter(user,puntoAcopio)
                    }).map((puntoAcopio) => (
                        <button key={puntoAcopio.id} onClick={() => { handleOpenNewsletterModal(puntoAcopio) }} >
                            <CollectionPointCard showStatus={false} key={puntoAcopio.id} collectionPoint={puntoAcopio}></CollectionPointCard>
                        </button>
                    ))}
            </div>
            <CollectionPointModal collectionPoint={modalCollectionPoint} isOpen={isCollectionModalOpen} onClose={handleCloseNewsletterModal}>

                <div className="flex justify-around">

                    <button className=" border-white font-bold   bg-[#1C9D11]  text-white  border-solid border-2 rounded-xl px-10" onClick={() => {
                        updateCollectionPointStatus(modalCollectionPoint.id,3)
                        window.location.reload();
                    }}>
                        Aceptar
                    </button>

                    <button onClick={() => {
                        updateCollectionPointStatus(modalCollectionPoint.id,2);
                        window.location.reload();
                    }}className=" border-white font-bold  bg-[#FD595A]  text-white  border-solid border-2 rounded-xl px-10">
                        Rechazar
                    </button>
                </div>

            </CollectionPointModal>
        </>
    )
}




