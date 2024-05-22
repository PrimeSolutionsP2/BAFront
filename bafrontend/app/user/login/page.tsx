"use client"

import { RefObject, useContext, useRef } from "react"
import {Login} from "utils/login/user.service";
import { UserContext } from "context/UserContext";
import { useRouter } from "next/navigation";

export default function Page() {

    const router = useRouter();

    const mailRef: RefObject<HTMLInputElement> = useRef(null);
    const passwordRef: RefObject<HTMLInputElement> = useRef(null);

    const {user, setUser} = useContext(UserContext);

    const handleLogin = async () => {
        event?.preventDefault();
        const loggedInUser = await Login({mail: mailRef.current?.value, password: passwordRef.current?.value});
        console.log(loggedInUser)
        setUser(loggedInUser);
        if(loggedInUser?.id !== 0) {
            router.push("/");
        }
    }

    return(
    <div>
        <div className="flex flex-col gap-3 justify-center items-center shadow-xl w-1/4 m-auto mt-[10%] p-5">
            <h3 className="text-3xl font-bold text-var-red">Inicio de Sesion</h3>
            <div className="flex flex-col justify-center items-center gap-3">
                <div className="flex flex-col items-center">
                    <label htmlFor="mail">Correo</label>
                    <input type="text" name="mail" id="mail" ref={mailRef} className="border border-solid border-var-blue rounded-lg p-2" />
                </div>
                <div className="flex flex-col items-center">
                    <label htmlFor="password">Contraseña</label>
                    <input type="password" name="password" id="password" ref={passwordRef} className="border border-solid border-var-blue rounded-lg p-2" />
                </div>
                <button className="p-1 rounded-lg p-2 bg-var-red text-white" onClick={() => handleLogin()}>Ingresar</button>
            </div>
        </div>
    </div>)
}