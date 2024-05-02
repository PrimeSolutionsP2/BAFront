import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import Modal from "./Modal";
import { PuntoAcopio } from "utils/collectionPoint/collectionPoint.service";
import StateCard from "./StateCard";
import { chooseColor } from "utils/collectionPoint/utils";
import addPickupRequest, { pickupRequestReq } from "utils/pickupRequest/pickupRequest.service";
import { UserContext } from "context/UserContext";


export default function CollectionPointModal({
  isOpen,
  onClose,
  collectionPoint,
  children 
}) {

  const focusInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen && focusInputRef.current) {
      setTimeout(() => {
        focusInputRef.current!.focus();
      }, 0);
    }
  }, [isOpen]);





  return (
    <Modal
      hasCloseBtn={true}
      isOpen={isOpen}
      onClose={onClose}>

      {collectionPoint ?
        <div className="flex flex-col space-y-4">
          <div className="mx-auto">
            <span className="font-bold">{collectionPoint.nombre} </span>
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

          {children}

            </div>
            :

            ""
      }

      


          </Modal>
          );
};




