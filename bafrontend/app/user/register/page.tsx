"use client"

import { Ref, RefObject, useRef } from "react"
import { Login } from "utils/login/user.service";

export default function Page() {

    const idRef: RefObject<HTMLInputElement> = useRef(null);
    const nameRef: RefObject<HTMLInputElement> = useRef(null);
    const lastName: RefObject<HTMLInputElement> = useRef(null);
    const numberRef: RefObject<HTMLInputElement> = useRef(null);
    const mailRef: RefObject<HTMLInputElement> = useRef(null);
    const roleRef: RefObject<HTMLInputElement> = useRef(null);
    const passwordRef: RefObject<HTMLInputElement> = useRef(null);

    const handleLogin = async () => {
        event?.preventDefault();
        console.log(await Login({mail: mailRef.current?.value, password: passwordRef.current?.value}))
    }

    return(
    <div>
        <div className="flex flex-col gap-3 justify-center items-center shadow-xl w-1/4 m-auto mt-[10%] p-5">
            <h3 className="text-3xl font-bold text-var-red">Registro de usuarios</h3>
            <div className="flex flex-col justify-center items-center gap-3">
                <div className="flex flex-col items-center">
                    <label htmlFor="id">Cedula</label>
                    <input type="number" name="id" id="id" ref={idRef} className="border border-solid border-var-blue rounded-sm p-1" />
                </div>
                <div className="flex flex-col items-center">
                    <label htmlFor="name">Nombre</label>
                    <input type="text" name="name" id="name" ref={nameRef} className="border border-solid border-var-blue rounded-sm p-1" />
                </div>
                <div className="flex flex-col items-center">
                    <label htmlFor="password">Apellido</label>
                    <input type="text" name="password" id="password" ref={lastName} className="border border-solid border-var-blue rounded-sm p-1" />
                </div>
                <div className="flex flex-col items-center">
                    <label htmlFor="number">Telefono</label>
                    <input type="number" name="number" id="number" ref={numberRef} className="border border-solid border-var-blue rounded-sm p-1" />
                </div>
                <div className="flex flex-col items-center">
                    <label htmlFor="mail">Correo</label>
                    <input type="mail" name="mail" id="mail" ref={mailRef} className="border border-solid border-var-blue rounded-sm p-1" />
                </div>
                <div className="flex flex-col items-center">
                    <label htmlFor="role">Rol</label>
                    <input type="number" name="role" id="role" ref={roleRef} className="border border-solid border-var-blue rounded-sm p-1" />
                </div>
                <button className="p-1 rounded-sm bg-var-red text-white" onClick={() => handleLogin()}>Crear usuario</button>
            </div>
        </div>
    </div>)
}