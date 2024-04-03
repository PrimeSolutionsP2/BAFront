'use client';

import CollectionPointCard from "@/components/CollectionPointCard";
import CollectionPointModal from "@/components/CollectionPointModal";
import FilterBar from "@/components/FilterBar";
import { useState } from "react";
import { PuntoAcopio } from "utils/collectionPoint/collectionPoint.service";


export default function CollectionPoints({puntosAcopio} : {puntosAcopio : PuntoAcopio[]}){
    const handleOpenNewsletterModal = (modalCollectionPoint : PuntoAcopio) => {
        setModalCollectionPoint(modalCollectionPoint)
        setIsCollectionModalOpen(true);
      };
    
      const handleCloseNewsletterModal = () => {
        setIsCollectionModalOpen(false);
      };

    const [isCollectionModalOpen, setIsCollectionModalOpen] = useState(false);

    const [modalCollectionPoint, setModalCollectionPoint] = useState(puntosAcopio);
    return(
        <>
        <FilterBar></FilterBar>            
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {puntosAcopio.map((puntoAcopio) => (

                    <button onClick={() =>{handleOpenNewsletterModal(puntoAcopio)}} >

                    <CollectionPointCard collectionPoint={puntoAcopio}></CollectionPointCard>
                    </button>
                ))}
        </div>
        <CollectionPointModal collectionPoint={modalCollectionPoint} isOpen={isCollectionModalOpen} onClose={handleCloseNewsletterModal}>
        </CollectionPointModal>
        </>
    )
}