'use client';

import CollectionPointCard from "@/components/CollectionPointCard";
import CollectionPointModal from "@/components/CollectionPointModal";
import FilterBar from "@/components/FilterBar";
import { useContext, useState } from "react";
import { PuntoAcopio, userFilter } from "utils/collectionPoint/collectionPoint.service";
import PuntosAcopio from "./page";
import { PickupRequestForm } from "@/components/pickupRequestForm";
import StateCard from "@/components/StateCard";
import { chooseColor } from "utils/collectionPoint/utils";
import { UserContext } from "context/UserContext";
import { useRouter } from "next/navigation";
import { UserData } from "app/asociados/page";


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
  const [editMode, setEditMode] = useState(false)
  const { user } = useContext(UserContext);
  const router = useRouter();


  const handleOpenNewsletterModal = (modalCollectionPoint: PuntoAcopio) => {
    setModalCollectionPoint(modalCollectionPoint)
    setIsCollectionModalOpen(true);
  };

  const handleCloseNewsletterModal = () => {
    setIsCollectionModalOpen(false);
  };
  const [isCollectionModalOpen, setIsCollectionModalOpen] = useState(false);
  const [modalCollectionPoint, setModalCollectionPoint] = useState(puntosAcopio);

  /** 
  if (user?.id == "0"){
    router.push("/user/login")
  }

  if(user?.type == "RECOLECTOR"){
    router.push("/")
  }
  */


  return (
    <>


      <FilterBar filterParams={collectionPointfilterParams} setFilterParams={setCollectionFilterParams}></FilterBar>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">

        {puntosAcopio.
          filter((puntoAcopio: PuntoAcopio) => {
            return puntoAcopio.nombre.toLowerCase().includes(collectionPointfilterParams.name.toLowerCase()) && userFilter(user, puntoAcopio)
          }).map((puntoAcopio) => (
            <button key={puntoAcopio.id} onClick={() => { handleOpenNewsletterModal(puntoAcopio) }} >
              <CollectionPointCard showStatus={true} key={puntoAcopio.id} collectionPoint={puntoAcopio}></CollectionPointCard>
            </button>
          ))}
      </div>
      <CollectionPointModal collectionPoint={modalCollectionPoint} isOpen={isCollectionModalOpen} onClose={handleCloseNewsletterModal}>

        <StateCard className="rounded-md text-center" color={chooseColor(modalCollectionPoint.estado)} statusString={modalCollectionPoint.estado} ></StateCard>
        {editMode ?
          <div className="flex justify-around">
            <button onClick={() => { }} className=" border-white font-bold  bg-[#7ae697] w-1/2 text-white  border-solid border-2 rounded-xl p-1">
              Guardar y enviar a revisión
            </button>
            <button onClick={() => { setEditMode(false) }} className=" border-white font-bold w-1/2 bg-[#FD595A]   text-white  border-solid border-2 rounded-xl p-1">
              Cancelar
            </button>

          </div>
          :
          <button onClick={() => { setEditMode(true) }} className=" border-white font-bold  bg-[#190dc2]  text-white  border-solid border-2 rounded-xl p-1">
            Editar punto de acopio
          </button>

        }

        <ModalPickupForm collectionPointId={modalCollectionPoint.id}></ModalPickupForm>

      </CollectionPointModal>
    </>
  )
}


function ModalPickupForm({ collectionPointId }) {
  const [showPickupRequest, setShowPickupRequest] = useState(false);
  function handlePickupRequestForm() {
    setShowPickupRequest(!showPickupRequest);
  }

  return (
    <>
      <button onClick={handlePickupRequestForm} className=" border-white font-bold  bg-[#FD595A]  text-white  border-solid border-2 rounded-xl p-1">
        Solicitar recoleccion de residuos
      </button>

      {showPickupRequest ? <PickupRequestForm collectionPointId={collectionPointId} isOpen={showPickupRequest}></PickupRequestForm> : ""}
    </>)

}
