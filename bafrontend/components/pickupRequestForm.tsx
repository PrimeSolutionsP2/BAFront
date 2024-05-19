"use client"
import { UserContext } from "context/UserContext";
import { FormEvent, useContext, useState } from "react";
import addPickupRequest, { pickupRequestReq } from "utils/pickupRequest/pickupRequest.service";
import StateCard from "./StateCard";


export function PickupRequestForm({ collectionPointId , isOpen}) {

    const { user, setUser } = useContext(UserContext);

    const [pickupRequestDate, setPickupRequestDate] = useState("");
    const [pickupResponseStatus, setPickupResponseStatus] = useState(null);

    async function handlePickupSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const payload: pickupRequestReq = {
            collectionPointId: collectionPointId,
            kilograms: 10,
            pickupDate: pickupRequestDate
        };


        const response = await addPickupRequest(payload);

        setPickupResponseStatus(response);
    }


    if (!isOpen){
        setPickupResponseStatus(null);
    }


    return (
        isOpen ?
        <>
            <form className="flex justify-between" onSubmit={handlePickupSubmit}>
                <label className="font-bold" htmlFor="pickupRequest">Fecha de recoleccion: </label>
                <input type="datetime-local" id="pickupRequest" name="pickupRequest" value={pickupRequestDate} onChange={(e) => { setPickupRequestDate(e.target.value) }} />
                <input className="border-white font-bold  bg-[#FD595A]  text-white  border-solid border-2 rounded-xl p-1" type="submit" value="Confirmar solicitud" />
            </form>

            <div>
                {(pickupResponseStatus) ? <StateCard statusString={pickupResponseStatus.message} className="rounded-md text-center" color={"green"}></StateCard> : ""}
            </div>
        </>
        :
        ""
    )
}

