import Image from "next/image"
import Modal from "./Modal"
import weight from "public/icons/weight.svg"
import { completePickupRequest } from "utils/pickupRequest/pickupRequest.service"
import { useState } from "react"
export default function FinishPickupModal({
    isOpen,
    onClose,
    pickupId,
    }){

    const [kilograms,setKilograms] = useState(0) 

    const completePickup  = () => {
        completePickupRequest(pickupId,kilograms)
    }

    return (
        <Modal isOpen={isOpen} hasCloseBtn={false} onClose={onClose}>
            <div className="m-16 flex flex-col gap-5 justify-center ">
                    <p className="text-center text-3xl text-[#FD595A] font-bold text-red">
                        Finalizar recoleccion 
                    </p>
                    <div className="flex justify-center">
                    <label htmlFor="kilograms">
                    <Image alt="weight" width={20} height={20} src={weight}></Image>
                    </label>
                    <input onChange={(e) => setKilograms(e.target.value)}className="text-center mx-3"  type="number" name="kilograms" id="kilograms" placeholder="Kilogramos recolectados (kg)"/> 
                    <span>kg</span>
                    </div>
                    <div className="text-center">
                    <button onClick={completePickup}type={"button"}  id="confirmedit"  className="font-bold bg-[#1C9D11]  text-white  border-solid border-2 rounded-md shadow-2xl p-2 px-3">Confirmar</button>
                  <button type="button" onClick={onClose} className="font-bold bg-[#E70C0C] 9] text-white  border-solid border-2 rounded-md shadow-2xl p-2 px-3">Cancelar</button>
                    </div>
            </div>
        </Modal>
    )

}