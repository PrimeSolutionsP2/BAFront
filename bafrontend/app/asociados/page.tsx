"use client"

import { GetUsers } from "utils/login/user.service";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import iconAddUser from "../../public/icons/icon _add user_.svg";
import Image from "next/image";

export interface UserData {
  id: number;
  name: string;
  mail: string;
  type: number | string;
}

export default function Page() {

  const router = useRouter();

  const [users, setUsers] = useState<UserData[]>([{id: 0, name: "Felipe", mail: "", type: 0}]);

  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching users...")
      setUsers(await GetUsers());
    }
    fetchData();
  }, [])

  return (
    <div>
      <div className="shadow p-2">
        <div className="w-[100%] p-6 bg-red flex flex-row justify-between">
          <h1 className="text-[30px] font-bold">Asociados</h1>
          <p className="cursor-pointer" onClick={() => router.push("/asociados/register")}>
            <Image src={iconAddUser} alt="icon_add_user"/>
          </p>
        </div>
        <ul className="flex flex-row justify-between">
          <li className="w-[33.333333%] text-center">
            <p className="text-[22px] font-bold">Nombre</p>
          </li>
          <li className="w-[33.333333%] text-center">
            <p className="text-[22px] font-bold">Correo</p>
          </li>
          <li className="w-[33.333333%] text-center">
            <p className="text-[22px] font-bold">Rol</p>
          </li>
        </ul>
        {users.map((user) => (
          <ul key={user.id} className="flex flex-row justify-between my-5 py-5 hover:bg-gray-100">
            <li className="w-[33.333333%] text-center">
              <p className="text-[15px]">{user.name}</p>
            </li>
            <li className="w-[33.333333%] text-center">
              <p className="text-[15px]">{user.mail}</p>
            </li>
            <li className="w-[33.333333%] text-center">
              <p className="text-[15px]">{user.type}</p>
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
}
