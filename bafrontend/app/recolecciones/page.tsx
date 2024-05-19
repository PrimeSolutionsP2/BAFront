"use client";

import { getPickups, getCollectors, Pickup, Collector } from "utils/pickupRequest/pickupRequest.service";
import { PICKUP_STATUS, PICKUP_COLOR } from "utils/constants";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import iconAddUser from "../../public/icons/icon _add user_.svg";
import Image from "next/image";
import { UserContext } from "context/UserContext";
import { PuntoAcopio } from "utils/collectionPoint/collectionPoint.service";
import CollectionPointModal from "@/components/CollectionPointModal";
import { forEach } from "node_modules/cypress/types/lodash";
import StateCard from "@/components/StateCard";
import TitleBar from "@/components/TitleBar";
import search from "public/icons/search.svg"
import Color, { rgb } from "color";
import PickupElement from "@/components/pickup";
import FinishPickupModal from "@/components/FinishPickupModal";
import { ResponseStatus } from "utils/login/user.service";

/*
export interface Pickup {
  id: number;
  user: {
    id: string;
    name: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    password: string | null;
    roleId: number;
  };
  collectionPoint: {
    id: number;
    user: {
      id: string;
      name: string;
      lastName: string;
      email: string;
      phoneNumber: string;
      password: string | null;
      roleId: number;
    };
    statusId: number | null;
    agreementCode: string | null;
    address: string;
    city: string;
    state: string;
    country: string;
  };
  kilograms: number | null;
  pickupDate: string | null;
  commentary: string | null;
  dateCreate: string | null;
  pickupRequestStatus: {
    id: number;
    name: string;
  } | null;
}


}
*/
function parseDateString(dateString: string) {

  let parsedDateString = dateString.split("-")

  return parsedDateString[0] + "/" + parsedDateString[1]
}

export default function Page() {
  const router = useRouter();

  const [pickups, setPickups] = useState<Pickup[]>([]);
  const [collectors, setCollectors] = useState<Collector[]>([]);
  
  const [responseStatus,setResponseStatus] = useState<ResponseStatus>({code:0,message:""});


  const [isCollectionModalOpen, setIsCollectionModalOpen] = useState(false);
  const [modalCollectionPoint, setModalCollectionPoint] = useState<PuntoAcopio>({
    id: 0,
    userId: "",
    nombre: "",
    direccion: "",
    convenio: "",
    ciudad: "",
    departamento: "",
    pais: "",
    estado: "",
  });

  const [modalPickupId, setModalPickupId] = useState<number>(0);
  const [isPickupModalOpen,setIsPickupModalOpen] = useState<boolean>(false);

  const [statusFilter, setStatusFilter] = useState(0);


  const handleOpenNewsletterModal = (modalCollectionPoint: PuntoAcopio) => {
    setModalCollectionPoint(modalCollectionPoint)
    setIsCollectionModalOpen(true);
  };

  const handleOpenFinishPickupModal = (pickup : Pickup) => {
    setModalPickupId(pickup.id);
    setIsPickupModalOpen(true);
  }

  const handleCloseFinishPickupModal = (pickup : Pickup) => {
    setIsPickupModalOpen(false);
  }

  const handleCloseNewsletterModal = () => {
    setIsCollectionModalOpen(false);
  };


  const { user } = useContext(UserContext);
  const userRole = user.role
  const userId = user?.id !== null ? user?.id : "";

  console.log("contexto entero: ");
  console.log(user);

  console.log("role: " + userRole + ", userId: " + userId);

  /*
  if(userId == 0){
    router.push("/")
  }
  */



  useEffect(() => {
    const fetchPickups = async () => {
      console.log("Fetching pickups...");
      const data = await getPickups(userRole, userId);
      console.log("use",data)
      data?.map(((item: Pickup) => {
      }))

      setPickups(data);
    };
    fetchPickups();

    const fetchUsers = async () => {
      console.log("Fetching collectors...");
      const data = await getCollectors();
      setCollectors(data);
    };
    fetchUsers();
  }, []);



  function chooseStatusColor(code: number): string {
    if (code >=  200  && code < 300 ) return "green";
    else if (code >= 400 && code <= 500) return "red"
    else return "gray"
  }

  return (
    <div>
      <TitleBar title={"Recolecciones"}>

        <select className="bg-[#F6F6F6] rounded-lg px-4" onChange={(e) => {
          e.target.style.backgroundColor = Color(PICKUP_COLOR[e.target.value]).alpha(0.2).string();
          setStatusFilter(e.target.value)
        }}>
          {PICKUP_STATUS.map((statusString, idx) => {
            return <option value={idx}>{statusString}</option>
          })}
        </select>
      </TitleBar>


      <CollectionPointModal modalTitle="Informacion punto de acopio" collectionPoint={modalCollectionPoint} isOpen={isCollectionModalOpen} onClose={handleCloseNewsletterModal}>
      </CollectionPointModal>

      <FinishPickupModal pickupId={modalPickupId} isOpen={isPickupModalOpen} onClose={handleCloseFinishPickupModal}></FinishPickupModal>

        <div className="mr-3">

          {responseStatus.code != 0 ? 
            <StateCard className="text-center p-3 rounded-md text-2xl m-10" statusString={responseStatus.message} color={chooseStatusColor(responseStatus.code)}></StateCard>
          : ""}

     
      <ul className="flex flex-row justify-between">
        <li className="w-[12.5%] text-center">
          <p className="text-[22px] font-bold">Fecha de creación</p>
        </li>
        <li className="w-[12.5%] text-center">
          <p className="text-[22px] font-bold">Punto de acopio</p>
        </li>
        <li className="w-[12.5%] text-center">
          <p className="text-[22px] font-bold">Recolector</p>
        </li>
        <li className="w-[12.5%] text-nowrap text-center">
          <p className="text-[22px] font-bold">Fecha de recolección</p>
        </li>
        <li className="w-[12.5%] text-center">
          <p className="text-[22px] font-bold">Estado</p>
        </li>
        <li className="w-[12.5%] text-center">
          <p className="text-[22px] font-bold">Kilogramos</p>
        </li>
        <li className="w-[12.5%] text-center">
          <p className="text-[22px] font-bold"></p>
        </li>
      </ul>
      {pickups.map((pickup: Pickup) => (

        statusFilter == 0 || pickup.pickupRequestStatus.id == statusFilter ?

            <PickupElement onSetResponseStatus={setResponseStatus}  pickup={pickup} collectors={collectors} handleOpenNewsletterModal={handleOpenNewsletterModal} handleOpenFinishPickupModal={handleOpenFinishPickupModal}></PickupElement>
         
          
          :
          ""
      )


      )}
    </div>
    </div>

  );
}
