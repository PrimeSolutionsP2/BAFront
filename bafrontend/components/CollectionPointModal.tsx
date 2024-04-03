import { useEffect, useRef, useState } from "react";
import Modal from "./Modal";
import { PuntoAcopio } from "utils/collectionPoint/collectionPoint.service";
import StateCard from "./StateCard";
import { chooseColor } from "utils/collectionPoint/utils";


export default function CollectionPointModal({
  isOpen,
  onClose,
  collectionPoint
}) {


  const [showPickupRequest,setShowPickupRequest] = useState(false);


  const focusInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen && focusInputRef.current) {
      setTimeout(() => {
        focusInputRef.current!.focus();
      }, 0);
    }
  }, [isOpen]);

  function handlePickupRequestForm(){
    setShowPickupRequest(!showPickupRequest);
  }



  return (
    <Modal
      hasCloseBtn={true}
      isOpen={isOpen}
      onClose={onClose}>

      {collectionPoint ?
        <div className="flex flex-col space-y-4">
          <div className="mx-auto">
            <span className="font-bold">Nombre: {collectionPoint.nombre} </span>
          </div>

          <div className="flex gap-4">
            <div>
              <span className="font-bold">Pais:  </span> {collectionPoint.pais}
            </div>

            <div>
              <span className="font-bold">Departamento:  </span> {collectionPoint.departamento}
            </div>

            <div>
              <span className="font-bold">Ciudad:  </span> {collectionPoint.ciudad}
            </div>
          </div>

          <div className="flex gap-4">
            <div><span className="font-bold">Dirección: </span>{collectionPoint.direccion}</div>
          </div>

          <div className="flex gap-4">
            <div><span className="font-bold">Convenio: </span>{collectionPoint.convenio}</div>
          </div>
          <StateCard className="rounded-md text-center" color={chooseColor(collectionPoint.estado)} statusString={collectionPoint.estado} ></StateCard>

          <button onClick={handlePickupRequestForm} className=" border-white font-bold  bg-[#FD595A]  text-white  border-solid border-2 rounded-xl p-1">
            Solicitar recoleccion de residuos
          </button>

          {showPickupRequest ? <PickupRequestForm></PickupRequestForm> : ""}
      

            </div>

            :

            ""

      }


          </Modal>
          );
};


function PickupRequestForm(){

  function handlePickupSubmit(event: FormEvent<HTMLFormElement>): void {
    throw new Error("Function not implemented.");
  }

  return (

    <form className="flex justify-between" onSubmit={handlePickupSubmit}>
    <label className="font-bold" htmlFor="pickupRequest">Fecha de recoleccion: </label>
    <input type="datetime-local" id="pickupRequest" name="pickupRequest"/>
      <input type="submit"/>
      </form>
  )
}