"use client"

import CollectionPointCard from "@/components/CollectionPointCard";
import CollectionPointModal from "@/components/CollectionPointModal";
import FilterBar from "@/components/FilterBar";
import { CollectionPointfilterParams } from "app/puntos-acopio/CollectionPoints";
import { UserContext } from "context/UserContext";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { PuntoAcopio, getCollectionPointRequests, updateCollectionPointStatus, userFilter } from "utils/collectionPoint/collectionPoint.service";


export default function CollectionPoints() {

    const { user } = useContext(UserContext);

    const router = useRouter();

    const [puntosAcopio, setPuntosAcopio] = useState<PuntoAcopio[]>([]);

    const handleOpenNewsletterModal = (modalCollectionPoint: PuntoAcopio) => {
        setModalCollectionPoint(modalCollectionPoint)
        setIsCollectionModalOpen(true);
    };

    const handleCloseNewsletterModal = () => {
        setIsCollectionModalOpen(false);
    };

    

    const fetchData = async () => {

        if(user?.type == "ADMINISTRADOR"){
          setPuntosAcopio(await getCollectionPointRequests());
        }else if(user?.type == "REPRESENTANTE"){
          setPuntosAcopio(await getCollectionPointRequests("search="+user.id));
  
        }
  
      }

      useEffect(() => {
        console.log("Fetching collections point...")
        fetchData();
      }, [])

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

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">

                {puntosAcopio.map((puntoAcopio) => (
                        <button key={puntoAcopio.id} onClick={() => { handleOpenNewsletterModal(puntoAcopio) }} >
                            <CollectionPointCard showStatus={false} key={puntoAcopio.id} collectionPoint={puntoAcopio}></CollectionPointCard>
                        </button>
                    ))}
            </div>
            <CollectionPointModal modalTitle="Solicitud de punto de acopio pendiente" collectionPoint={modalCollectionPoint} isOpen={isCollectionModalOpen} onClose={handleCloseNewsletterModal}>
                {user?.type == "ADMINISTRADOR" &&
                <div className="flex justify-around">
                
                    <button className=" border-white font-bold   bg-[#1C9D11]  text-white  border-solid border-2 rounded-xl px-10" onClick={() => {
                        updateCollectionPointStatus(modalCollectionPoint.id,2)
                        setPuntosAcopio(puntosAcopio.filter((pAcopio:PuntoAcopio) => {
                            return pAcopio.id != modalCollectionPoint.id
                        })
                        
                    )
                    handleCloseNewsletterModal()
                    }}>
                        Aceptar
                    </button>

                    <button onClick={() => {
                        updateCollectionPointStatus(modalCollectionPoint.id,3);
                        setPuntosAcopio(puntosAcopio.filter((pAcopio:PuntoAcopio) => {
                            return pAcopio.id != modalCollectionPoint.id
                        }
                    ))
                    handleCloseNewsletterModal()
                    }
                    
                    }className=" border-white font-bold  bg-[#FD595A]  text-white  border-solid border-2 rounded-xl px-10">
                        Rechazar
                    </button>
                </div>}

            </CollectionPointModal>
        </>
    )
}




