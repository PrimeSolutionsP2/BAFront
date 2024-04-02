"use client"

import { GetUsers } from "utils/login/user.service";
import { useEffect, useState } from "react";

export interface UserData {
  id: number;
  name: string;
  mail: string;
  type: number | string;
}

export default function Page() {

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
