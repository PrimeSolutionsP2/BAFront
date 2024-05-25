"use client"

import { DeleteUsers, GetUsers, User } from "utils/login/user.service";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import iconAddUser from "../../public/icons/icon _add user_.svg";
import Image from "next/image";
import { ROLES } from "utils/constants";
import { UserContext } from "context/UserContext";

export default function Page() {

  const router = useRouter();

  const [users, setUsers] = useState<User[]>([{ id: "0", name: "unauthenticated", mail: "", role: 0, last_name: "unauthenticated", "phone_number": "" }]);

  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching users...")
      setUsers(await GetUsers());
    }
    fetchData();
  }, [])

  let user = useContext(UserContext).user;
  
  if (user.id == "0"){
    router.push("/user/login")
  }

  if(user.role != 1){
    router.push("/")
  }
  


  return (
    <div>
      <div className="shadow p-2">
        <div className="w-[100%] p-6 bg-red flex flex-row justify-between">
          <h1 className="text-[30px] font-bold">Asociados</h1>
          <p className="cursor-pointer" onClick={() => router.push("/asociados/register")}>
            <Image src={iconAddUser} alt="icon_add_user" />
          </p>
        </div>
        <ul className="flex flex-row justify-between">
          <li className="w-[25%] text-center">
            <p className="text-[22px] font-bold">Nombre</p>
          </li>
          <li className="w-[25%] text-center">
            <p className="text-[22px] font-bold">Correo</p>
          </li>
          <li className="w-[25%] text-center">
            <p className="text-[22px] font-bold">Rol</p>
          </li>
          <li className="w-[25%] text-center">
            <p className="text-[22px] font-bold"></p>
          </li>
        </ul>
        {users.map((user) => (
          <ul key={user.id} className="flex flex-row justify-between my-5 py-5 hover:bg-gray-100">
            <li className="w-[25%] text-center">
              <p className="text-[15px]">{user.name}</p>
            </li>
            <li className="w-[25%] text-center">
              <p className="text-[15px]">{user.mail}</p>
            </li>
            <li className="w-[25%] text-center">
              <p className="text-[15px]">{ROLES[user.role]}</p>
            </li>
            <li className="w-[25%] text-center">
              <button className="bg-red-500 text-white font-bold py-2 px-4  " type={"button"} onClick={async () => {
                await DeleteUsers(user.id);
                setUsers(users.filter((actualUser) => (actualUser.id != user.id)))
              }}>Eliminar usuario</button>

            </li>
          </ul>
        ))}
      </div>
    </div>
  );
}
