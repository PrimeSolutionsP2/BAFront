"use client";
import CollectionPointCard from "@/components/CollectionPointCard";
import CollectionPointModal from "@/components/CollectionPointModal";
import FilterBar from "@/components/FilterBar";
import StateCard from "@/components/StateCard";
import TitleBar from "@/components/TitleBar";
import { CollectionPointfilterParams, PuntoAcopio, getCollectionPoints } from "utils/collectionPoint/collectionPoint.service";
import CollectionPoints from "./CollectionPoints";
import { pickupRequestReq } from "utils/pickupRequest/pickupRequest.service";
import { FormEvent, useContext, useEffect, useState } from "react";
import { UserContext } from "context/UserContext";
import search from "public/icons/search.svg"
import Image from "next/image";
import { COLLECTION_POINT_STATUS } from "utils/constants";
import { chooseColor } from "utils/collectionPoint/utils";

export default function PuntosAcopio() {
    const [collectionPointfilterParams, setCollectionFilterParams] = useState<CollectionPointfilterParams>({ name: "", status: "" })


    return (
        <>
            <TitleBar title={"Puntos de acopio"} >
                <div className="border gap-3 px-2 rounded border-black flex flex-row">
                    <Image alt="search icon" src={search}></Image>
                    <input style={{ outline: "none" }} onChange={(e) => {
                        setCollectionFilterParams({ ...collectionPointfilterParams, name: e.target.value })
                    }} type="text" className="border-none" name="" placeholder="Buscar por nombre" id="" />
                </div>

                <select className="bg-[#F6F6F6] rounded-lg px-4" onChange={(e) => {
                    setCollectionFilterParams({ ...collectionPointfilterParams, status: e.target.value })
                }}>
                    <option value="">TODOS</option>
                    {COLLECTION_POINT_STATUS.slice(2).map((statusString, idx) => {
                        return <option value={statusString}>{statusString}</option>
                    })}

                </select>

            </TitleBar>

            <div className="py-5">
                <CollectionPoints collectionPointFilterParams={collectionPointfilterParams}></CollectionPoints>
            </div>
        </>
    )
}