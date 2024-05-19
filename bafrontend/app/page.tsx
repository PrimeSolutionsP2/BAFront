"use client"

import { UserContext } from "context/UserContext";
import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getPickups } from "utils/pickupRequest/pickupRequest.service";

interface PageProps {
  searchParams: {
    tab: string | null;
  }
}

export default function Page(props: PageProps) {


  const router = useRouter();
  const {user} = useContext(UserContext);

  useEffect(() => {
    if(user?.id === "0"){
      router.push("user/login"); 
    }
  },[])

  return <h2 className="text-var-red">Pagina de inicio</h2>;
}
