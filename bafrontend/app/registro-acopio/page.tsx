"use client";

import { RefObject, useRef } from "react";
import { CreateCollectionPoint } from "utils/collectionPoint/collectionPoint.service";
import { CollectionPointCreateRequest } from "utils/collectionPoint/collectionPoint.service";

export default function Page() {
  const userIdRef: RefObject<HTMLInputElement> = useRef(null);
  const nameRef: RefObject<HTMLInputElement> = useRef(null);
  const lastName: RefObject<HTMLInputElement> = useRef(null);
  const mailRef: RefObject<HTMLInputElement> = useRef(null);
  const numberRef: RefObject<HTMLInputElement> = useRef(null);
  const aggrementRef: RefObject<HTMLInputElement> = useRef(null);
  const addressRef: RefObject<HTMLInputElement> = useRef(null);
  const cityRef: RefObject<HTMLInputElement> = useRef(null);
  const stateRef: RefObject<HTMLInputElement> = useRef(null);
  const countryRef: RefObject<HTMLInputElement> = useRef(null);

  const handleLogin = async () => {
    event?.preventDefault();
    const response = await CreateCollectionPoint({
      userId: userIdRef.current?.value ?? "",
      name: nameRef.current?.value ?? "",
      lastName: lastName.current?.value ?? "",
      email: mailRef.current?.value ?? "",
      phoneNumber: numberRef.current?.value ?? "",
      agreement: aggrementRef.current?.value ?? "",
      address: addressRef.current?.value ?? "",
      city: cityRef.current?.value ?? "",
      state: stateRef.current?.value ?? "",
      country: countryRef.current?.value ?? "",
      statusId: 1,
    });
    console.log(response);
  };

  return (
    <div>
      <div className="flex flex-col gap-3 justify-center items-center shadow-xl w-1/4 m-auto mt-[10%] p-5">
        <h3 className="text-3xl font-bold text-var-red">
          Formulario de solicitud para punto de acopio
        </h3>
        <div className="flex flex-col justify-center items-center gap-3">
          <div className="flex flex-col items-center">
            <label htmlFor="id">Cedula</label>
            <input
              type="text"
              name="id"
              id="id"
              ref={userIdRef}
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
            <label htmlFor="role">Convenio</label>
            <input
              type="text"
              name="text"
              id="text"
              ref={aggrementRef}
              className="border border-solid border-var-blue rounded-sm p-1"
            />
          </div>
          <div className="flex flex-col items-center">
            <label htmlFor="role">Direccion</label>
            <input
              type="text"
              name="text"
              id="text"
              ref={addressRef}
              className="border border-solid border-var-blue rounded-sm p-1"
            />
          </div>
          <div className="flex flex-col items-center">
            <label htmlFor="role">Ciudad</label>
            <input
              type="text"
              name="text"
              id="text"
              ref={cityRef}
              className="border border-solid border-var-blue rounded-sm p-1"
            />
          </div>
          <div className="flex flex-col items-center">
            <label htmlFor="role">Estado</label>
            <input
              type="text"
              name="text"
              id="text"
              ref={stateRef}
              className="border border-solid border-var-blue rounded-sm p-1"
            />
          </div>
          <div className="flex flex-col items-center">
            <label htmlFor="role">Pais</label>
            <input
              type="text"
              name="text"
              id="text"
              ref={countryRef}
              className="border border-solid border-var-blue rounded-sm p-1"
            />
          </div>
          <button
            className="p-1 rounded-sm bg-var-red text-white"
            onClick={() => handleLogin()}
          >
            Crear punto de acopio
          </button>
        </div>
      </div>
    </div>
  );
}
