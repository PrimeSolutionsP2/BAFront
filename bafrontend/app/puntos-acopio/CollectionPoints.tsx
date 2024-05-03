'use client';

import CollectionPointCard from "@/components/CollectionPointCard";
import CollectionPointModal from "@/components/CollectionPointModal";
import FilterBar from "@/components/FilterBar";
import { useContext, useEffect, useState } from "react";
import { PuntoAcopio, getCollectionPoints, updateCollectionPointStatus, userFilter } from "utils/collectionPoint/collectionPoint.service";
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


export default function CollectionPoints() {

  const [collectionPointfilterParams, setCollectionFilterParams] = useState<CollectionPointfilterParams>({ name: "", country: "", state: "", city: "", address: "", agreement: "", status: "" });
  const [editMode, setEditMode] = useState(false)
  const { user } = useContext(UserContext);
  const router = useRouter();

  const [puntosAcopio, setPuntosAcopio] = useState<PuntoAcopio[]>([]);


  
  const handleOpenNewsletterModal = (modalCollectionPoint: PuntoAcopio) => {
    setModalCollectionPoint(modalCollectionPoint)
    setIsCollectionModalOpen(true);
  };

  const handleEditMode = () => {
    setEditMode(true);
  }

  const handleCloseNewsletterModal = () => {
    setIsCollectionModalOpen(false);
  };
  const [isCollectionModalOpen, setIsCollectionModalOpen] = useState(false);
  const [modalCollectionPoint, setModalCollectionPoint] = useState<PuntoAcopio>({    id: 0,
    userId: "",
    nombre: "",
    direccion: "",
    convenio: "",
    ciudad: "",
    departamento: "",
    pais: "",
    estado: "",});
  const [changedCollectionPoint, setChangedCollectionPoint] = useState<boolean>(true);
    const fetchData = async () => {

      if(user?.type == "ADMINISTRADOR"){
        setPuntosAcopio(await getCollectionPoints());
      }else if(user?.type == "REPRESENTANTE"){
        setPuntosAcopio(await getCollectionPoints("search="+user.id));

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
  


  function handleCollectionPointState(modalCollectionPoint:PuntoAcopio, statusId: number): void {
    updateCollectionPointStatus(modalCollectionPoint.id,statusId);
    const newList = puntosAcopio.map((item : PuntoAcopio) => {
      if (item.id === modalCollectionPoint.id) {
        const updatedItem = {
          ...item,
          estado: modalCollectionPoint.estado == "ACTIVO"? "INACTIVO" : "ACTIVO"
        };

        return updatedItem;
      }

      return item;
    });

    setPuntosAcopio(newList)
    setModalCollectionPoint({
      ...modalCollectionPoint,
      estado: modalCollectionPoint.estado == "ACTIVO"? "INACTIVO" : "ACTIVO"
    })
  }

  return (
    <>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">

        {puntosAcopio.
          filter((puntoAcopio: PuntoAcopio) => {
            return puntoAcopio.nombre.toLowerCase().includes(collectionPointfilterParams.name.toLowerCase())
          }).map((puntoAcopio) => (
            <button key={puntoAcopio.id} onClick={() => { handleOpenNewsletterModal(puntoAcopio) }} >
              <CollectionPointCard showStatus={true} key={puntoAcopio.id} collectionPoint={puntoAcopio}></CollectionPointCard>
            </button>
          ))}
      </div>

        <CollectionPointModal modalTitle="Informacion punto de acopio"collectionPoint={modalCollectionPoint} isOpen={isCollectionModalOpen} onClose={handleCloseNewsletterModal} editMode={editMode} onEditMode={handleEditMode}>

        <div className="flex flex-col">
          {editMode ?
          <div className="flex justify-around">
                      <button  type="submit" className=" border-white font-bold  bg-[#1C9D11]  text-white  border-solid border-2 rounded-xl p-1"> Confirmar edicion</button>
                      <button  onClick={()=>{setEditMode(false)}} className=" border-white font-bold  bg-[#F73636]  text-white  border-solid border-2 rounded-xl p-1"> Cancelar</button>
          </div>
                          : ""
                    
          }
          
            {user?.type == "ADMINISTRADOR" && modalCollectionPoint ? modalCollectionPoint.estado == "ACTIVO" ?

              <button type="button"  onClick={()=> handleCollectionPointState(modalCollectionPoint,3)} className=" border-white font-bold  bg-[#F73636]  text-white  border-solid border-2 rounded-xl p-1"> Inhabilitar</button>
              :
              <button type="button" onClick={()=> handleCollectionPointState(modalCollectionPoint,2)} className=" border-white font-bold  bg-[#70C169]  text-white  border-solid border-2 rounded-xl p-1"> Habilitar</button>
              :
              ""
            }

          {modalCollectionPoint && <ModalPickupForm collectionPointId={modalCollectionPoint.id}></ModalPickupForm>}
        </div>
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
