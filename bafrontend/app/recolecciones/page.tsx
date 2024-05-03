"use client";

import { getPickups, getCollectors } from "utils/pickupRequest/pickupRequest.service";
import { PICKUP_STATUS } from "utils/constants";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import iconAddUser from "../../public/icons/icon _add user_.svg";
import Image from "next/image";
import { UserContext } from "context/UserContext";

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

interface Collector {
  id: string,
  name: string,
  last_name: string,
  phone_number: string,
  mail: string,
  type: string
}

export default function Page() {
  const router = useRouter();

  const [pickups, setPickups] = useState<Pickup[]>([]);
  const [collectors, setCollectors] = useState<Collector[]>([]);

  const {user} = useContext(UserContext);
  const userRole = user?.type !== null ? user?.type : 0;
  const userId = user?.id !== null ? user?.id : "";

  console.log("contexto entero: ");
  console.log(user);

  console.log("role: "+ userRole + ", userId: "+ userId);

  useEffect(() => {
    const fetchPickups = async () => {
      console.log("Fetching pickups...");
      const data = await getPickups(userRole, userId);
      setPickups(data.data);
    };
    fetchPickups();

    const fetchUsers = async () => {
      console.log("Fetching collectors...");
      const data = await getCollectors();
      setCollectors(data);
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <div className="shadow p-2">
        <div className="w-[100%] p-6 bg-red flex flex-row justify-between">
          <h1 className="text-[30px] font-bold">Listado de recolecciones</h1>
        </div>
        <ul className="flex flex-row justify-between">
          <li className="w-[16.666666%] text-center">
            <p className="text-[22px] font-bold">Fecha de creación</p>
          </li>
          <li className="w-[16.666666%] text-center">
            <p className="text-[22px] font-bold">Punto de acopio</p>
          </li>
          <li className="w-[16.666666%] text-center">
            <p className="text-[22px] font-bold">Recolector</p>
          </li>
          <li className="w-[16.666666%] text-center">
            <p className="text-[22px] font-bold">Fecha de recolección</p>
          </li>
          <li className="w-[16.666666%] text-center">
            <p className="text-[22px] font-bold">Estado</p>
          </li>
          <li className="w-[16.666666%] text-center">
            <p className="text-[22px] font-bold">Notificar</p>
          </li>
        </ul>
        {pickups.map((pickup) => (
          <ul
            key={pickup.id}
            className="flex flex-row justify-between my-5 py-5 hover:bg-gray-100"
          >
            <li className="w-[16.666666%] text-center">
              <p className="text-[15px]">{pickup.dateCreate == null ? "date" : pickup.dateCreate}</p>
            </li>
            <li className="w-[16.666666%] text-center">
              <p className="text-[15px]">{pickup.collectionPoint.address}</p>
            </li>
            <li className="w-[16.666666%] text-center">
              {
                userRole == 1 || userRole == "ADMINISTRADOR" ?
                <select>
                  {collectors.map((collector) => (
                    <option key={collector.id} value={collector.id} selected={pickup.user == null ? false : collector.id === pickup.user.id ? true : false}>
                      {collector.name} {collector.last_name}
                    </option>
                  ))}
                </select>
                : <p>{pickup.user == null ? null : pickup.user.name} {pickup.user == null ? null : pickup.user.lastName}</p>
              }
              
            </li>
            <li className="w-[16.666666%] text-center">
              {
                userRole == 1 || userRole == "ADMINISTRADOR" ?
                <input type="datetime-local" value={pickup.pickupDate}/>
                : <p>{pickup.pickupDate == null ? null : pickup.pickupDate}</p>
              }
            </li>
            <li className="w-[16.666666%] text-center">
              <p className="text-[15px]">{pickup.pickupRequestStatus == null ? "es null" : PICKUP_STATUS[pickup.pickupRequestStatus.id]}</p>
            </li>
            <li className="w-[16.666666%] text-center">
              {
                userRole == 1 || userRole == "ADMINISTRADOR" ?
                <button>Notificar</button>
                : <button>Finalizar</button>
              }
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
}
