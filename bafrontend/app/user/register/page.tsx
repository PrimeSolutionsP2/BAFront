"use client";

import { Ref, RefObject, useRef } from "react";
import { CreateUser } from "utils/login/user.service";
import { ROLES } from "utils/constants";

export default function Page() {

  const idRef: RefObject<HTMLInputElement> = useRef(null);
  const nameRef: RefObject<HTMLInputElement> = useRef(null);
  const lastName: RefObject<HTMLInputElement> = useRef(null);
  const numberRef: RefObject<HTMLInputElement> = useRef(null);
  const mailRef: RefObject<HTMLInputElement> = useRef(null);
  const roleRef: RefObject<HTMLSelectElement> = useRef(null);
const passwordRef: RefObject<HTMLInputElement> = useRef(null);

const handleLogin = async () => {
    event?.preventDefault();
    console.log(
        await CreateUser({
            id: idRef.current?.value,
            name: nameRef.current?.value,
            lastName: lastName.current?.value,
            phoneNumber: numberRef.current?.value,
            mail: mailRef.current?.value,
            type: parseInt(roleRef.current?.value ?? ''),
        })
    );
};

  return (
    <div>
      <div className="flex flex-col gap-3 justify-center items-center shadow-xl w-1/4 m-auto mt-[10%] p-5">
        <h3 className="text-3xl font-bold text-var-red">
          Registro de usuarios
        </h3>
        <div className="flex flex-col justify-center items-center gap-3">
          <div className="flex flex-col items-center">
            <label htmlFor="id">Cedula</label>
            <input
              type="text"
              name="id"
              id="id"
              ref={idRef}
              className="border border-solid border-var-blue rounded-sm p-1"
            />
          </div>
          <div className="flex flex-col items-center">
            <label htmlFor="name">Nombre</label>
            <input
              type="text"
              name="name"
              id="name"
              ref={nameRef}
              className="border border-solid border-var-blue rounded-sm p-1"
            />
          </div>
          <div className="flex flex-col items-center">
            <label htmlFor="password">Apellido</label>
            <input
              type="text"
              name="password"
              id="password"
              ref={lastName}
              className="border border-solid border-var-blue rounded-sm p-1"
            />
          </div>
          <div className="flex flex-col items-center">
            <label htmlFor="text">Telefono</label>
            <input
              type="text"
              name="text"
              id="text"
              ref={numberRef}
              className="border border-solid border-var-blue rounded-sm p-1"
            />
          </div>
          <div className="flex flex-col items-center">
            <label htmlFor="mail">Correo</label>
            <input
              type="mail"
              name="mail"
              id="mail"
              ref={mailRef}
              className="border border-solid border-var-blue rounded-sm p-1"
            />
          </div>
          <div className="flex flex-col items-center">
            <label htmlFor="role">Rol</label>
            <select
              name="role"
              id="role"
              ref={roleRef}
              className="border border-solid border-var-blue rounded-sm p-1"
            >
              <option value={1}>{ROLES["Tipo1"]}</option>
              <option value={2}>{ROLES["Tipo2"]}</option>
              <option value={3}>{ROLES["Tipo3"]}</option>
            </select>
          </div>
          <button
            className="p-1 rounded-sm bg-var-red text-white"
            onClick={() => handleLogin()}
          >
            Crear usuario
          </button>
        </div>
      </div>
    </div>
  );
}
