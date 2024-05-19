import StateCard from "@/components/StateCard";
import { UserContext } from "context/UserContext"
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { PICKUP_COLOR, PICKUP_STATUS } from "utils/constants"
import { Collector, Pickup } from "utils/pickupRequest/pickupRequest.service"
import edit from "public/icons/edit.svg";
import { updatePickupRequest, getPickup } from "utils/pickupRequest/pickupRequest.service";
import { notifyPickupSchedule, notifyUser } from "utils/login/user.service";





export default function PickupElement({ pickup: pickup, handleOpenNewsletterModal, collectors, handleOpenFinishPickupModal, onSetResponseStatus }: { pickup: Pickup, handleOpenNewsletterModal: Function, collectors: Collector[],handleOpenFinishPickupModal:Function, onSetResponseStatus:Function}) {

  const { user } = useContext(UserContext);
  const userRole = user.role
  const userId = user?.id !== null ? user?.id : "";

  const [editMode, setEditMode] = useState<boolean>(false)

  const [actualPickup, setActualPickup] = useState(pickup);


  const [formCollectorId, setFormCollectorId] = useState(actualPickup.user?.id);
  const [formPickupDate, setFormPickupDate] = useState(actualPickup.pickupDate)


  
  useEffect(() => {
  }, [formCollectorId]);



  async function editPickupRequest(pickupToEdit:Pickup, collectorId:number, dateString:string){
    let actualResponse = await   updatePickupRequest(pickupToEdit,collectorId,dateString)
    onSetResponseStatus(actualResponse);
    const data = await getPickup(actualPickup.id,userRole, userId);
    setActualPickup(data);

  }

  return <form className="border border-solid border-black shadow-lg rounded-xl py-3 mb-6 bg-[#F3F3F3]">
    <ul
      key={actualPickup.id}
      className="flex flex-row items-center justify-between  hover:bg-gray-100"
    >
      <li className="w-[12.5%] text-center ">
        <p className="text-[15px]">{actualPickup.dateCreate == null ? "date" : (actualPickup.dateCreate)}</p>
      </li>


      <li className="w-[12.5%] text-center">
        <button type="button" onClick={() => {
          handleOpenNewsletterModal(actualPickup.collectionPoint
          )
        }} className="text-[15px] underline text-blue-400">{actualPickup.collectionPoint.nombre}</button>
      </li>


      <li className="w-[12.5%] text-center">
        {
          (userRole == 1 && editMode) || ( userRole == 1 && actualPickup.pickupRequestStatus.id == 1) ?
            <select id="select" className="bg-inherit " onChange={(e) => { setFormCollectorId(e.target.value);} } value={formCollectorId} >
              {collectors.map((collector) => (
                <option key={collector.id} value={collector.id}>
                  {collector.name} {collector.last_name}
                </option>
              ))}
              <option  value=""></option>
            </select>
            : <p>{actualPickup.user == null ? null : actualPickup.user.name} {actualPickup.user == null ? null : actualPickup.user.last_name}</p>
        }

      </li>
      <li className="w-[12.5%]  text-center">
        {

          (userRole == 1 && editMode) || ( userRole == 1 && actualPickup.pickupRequestStatus.id == 1)  ?
            <input type="datetime-local" onChange={(e) => setFormPickupDate(e.target.value)} value={formPickupDate} />
            : <p>{actualPickup.pickupDate == null ? null : (actualPickup.pickupDate)}</p>
        }
      </li>
      <li className="w-[12.5%] text-center ">
        <div className="">
          <p className="text-[15px]">{actualPickup.pickupRequestStatus == null ? "es null" : <StateCard textClassName={"font-medium"} statusString={PICKUP_STATUS[actualPickup.pickupRequestStatus.id]} color={PICKUP_COLOR[actualPickup.pickupRequestStatus.id]} className=""></StateCard>}</p>
        </div>
      </li>

      <li className="w-[12.5%] text-center">
        <p>{actualPickup.kilograms ? actualPickup.kilograms + " kg" : ""}</p>
      </li>

      <li className="w-[12.5%] text-center ">
        {userRole == 1 ?
          <div className="[margin-left:-20%] [margin-right:20%]">


            {actualPickup.pickupRequestStatus.id == 1 ?
              <button type="button" onClick={() => {
                editPickupRequest(actualPickup,formCollectorId,formPickupDate); 
                notifyPickupSchedule(actualPickup,actualPickup.collectionPoint)
              }}className="font-bold  bg-[#E70C0C]  text-white  border-solid border-2 rounded-md shadow-2xl p-2 px-3">Agendar recolección y notificar</button>
              :
              editMode ?
                <>
                  <button type={"button"} onClick={()=> {editPickupRequest(actualPickup,formCollectorId,formPickupDate); setEditMode(false)}} id="confirmedit"  className="font-bold bg-[#1C9D11]  text-white  border-solid border-2 rounded-md shadow-2xl p-2 px-3">Confirmar</button>
                  <button type="button" onClick={() => {
                  
                    setEditMode(!editMode)
                    
                    }} className="font-bold bg-[#E70C0C] 9] text-white  border-solid border-2 rounded-md shadow-2xl p-2 px-3">Cancelar</button>
                </>
                :
                <Image onClick={() => {setFormCollectorId(actualPickup.user?.id); setFormPickupDate(actualPickup.pickupDate); setEditMode(true); }} alt={"Edit pickup point"} src={edit}></Image>
            }
          </div>
          :
          actualPickup.pickupRequestStatus.id == 3?
          <button type="button"  onClick={() => {handleOpenFinishPickupModal(actualPickup)}}  className="font-bold  bg-[#E70C0C]  text-white  border-solid border-2 rounded-md shadow-2xl p-2 px-3">Finalizar</button>
          :
          ""
        }
      </li>


    </ul>
  </form>

}