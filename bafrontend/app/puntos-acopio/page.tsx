"use client";
import CollectionPointCard from "@/components/CollectionPointCard";
import CollectionPointModal from "@/components/CollectionPointModal";
import FilterBar from "@/components/FilterBar";
import StateCard from "@/components/StateCard";
import TitleBar from "@/components/TitleBar";
import { PuntoAcopio, getCollectionPoints } from "utils/collectionPoint/collectionPoint.service";
import CollectionPoints from "./CollectionPoints";
import { pickupRequestReq } from "utils/pickupRequest/pickupRequest.service";
import { FormEvent, useContext, useEffect } from "react";
import { UserContext } from "context/UserContext";
import search from "public/icons/search.svg"
import Image from "next/image";

export default function PuntosAcopio() {


    return (
        <>
            <TitleBar title={"Puntos de acopio"} >
                <div className="border gap-3 px-2 rounded border-black flex flex-row">
                <Image alt="search icon" src={search}></Image>
                 <input style={{outline:"none"}} type="text" className="border-none" name="" placeholder="Buscar por nombre" id="" /> 
                </div>

            </TitleBar>

            <div className="p-5">
                <CollectionPoints></CollectionPoints>
            </div>
        </>
    )
}