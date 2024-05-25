"use client"

import { UserContext } from "context/UserContext";
import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getPickups } from "utils/pickupRequest/pickupRequest.service";
import Image from "next/image";
import logo from '../public/images/baLogo.webp'
import bamorImage from "../public/images/bamorImagen.png"
interface PageProps {
  searchParams: {
    tab: string | null;
  }
}

export default function Page(props: PageProps) {


  const router = useRouter();
  const { user } = useContext(UserContext);
  useEffect(() => {
    if(user?.id === "0"){
      router.push("user/login"); 
    }
  },[])

  return (
    <div className="flex flex-row justify-around w-[70%]  mx-auto border-4 mt-[5%] shadow-xl p-4 pb-20">

      <div className="w-[40%]">
        <div className="flex justify-center">
          <Image className="" width={300} src={logo} alt="baLogo" />
        </div>
        <h2 className="text-2xl text-center font-bold text-red-500 mb-3">Construir Felicidad Con Residuos Plásticos Es Posible</h2>

        <p className="text-2xl p-4 border  bg-sky-200		 rounded-md text-gray-700 ">
          Con nuestra Estrategia de Economía Circular podemos transformar los residuos plásticos flexibles en viviendas, parques infantiles y mobiliario en plástico reciclado.Una estrategia efectiva en la que 
          tus Actos de Amor son el punto de partida para Reducir La Basura Plástica y Construir Felicidad en comunidades vulnerables.
        </p>
      </div>

      <div className="self-end">
        <Image className="" src={bamorImage} alt="baLogo" />
      </div>


    </div>
  )
}
