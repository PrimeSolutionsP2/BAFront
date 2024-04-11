'use client';

import CollectionPointCard from "@/components/CollectionPointCard";
import CollectionPointModal from "@/components/CollectionPointModal";
import FilterBar from "@/components/FilterBar";
import { useState } from "react";
import { PuntoAcopio } from "utils/collectionPoint/collectionPoint.service";
import PuntosAcopio from "./page";


export interface CollectionPointfilterParams {
  name: string
  country: string
  state: string
  city: string
  address: string
  agreement: string
  status: string;
}


export default function CollectionPoints({ puntosAcopio }: { puntosAcopio: PuntoAcopio[] }) {

  const [collectionPointfilterParams, setCollectionFilterParams] = useState<CollectionPointfilterParams>({ name: "", country: "", state: "", city: "", address: "", agreement: "", status: "" });

  const handleOpenNewsletterModal = (modalCollectionPoint: PuntoAcopio) => {
    setModalCollectionPoint(modalCollectionPoint)
    setIsCollectionModalOpen(true);
  };

  const handleCloseNewsletterModal = () => {
    setIsCollectionModalOpen(false);
  };

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
          }).map((puntoAcopio) => (
            <button key={puntoAcopio.id} onClick={() => { handleOpenNewsletterModal(puntoAcopio) }} >
              <CollectionPointCard key={puntoAcopio.id} collectionPoint={puntoAcopio}></CollectionPointCard>
            </button>
          ))}
      </div>
      <CollectionPointModal collectionPoint={modalCollectionPoint} isOpen={isCollectionModalOpen} onClose={handleCloseNewsletterModal}>
      </CollectionPointModal>
    </>
  )
}