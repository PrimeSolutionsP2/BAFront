import { FormEvent, cloneElement, useContext, useEffect, useRef, useState } from "react";
import Modal from "./Modal";
import { PuntoAcopio, PuntoAcopioReq, updateCollectionPoint } from "utils/collectionPoint/collectionPoint.service";
import StateCard from "./StateCard";
import { chooseColor } from "utils/collectionPoint/utils";
import addPickupRequest, { pickupRequestReq } from "utils/pickupRequest/pickupRequest.service";
import { UserContext } from "context/UserContext";
import edit from "public/icons/edit.svg"
import upload from "public/icons/upload.svg"
import download from "public/icons/download.svg"
import mail from "public/icons/mail.svg"
import address from "public/icons/address.svg"
import phone from "public/icons/phone.svg"
import Image from "next/image";
import PuntosAcopio from "app/puntos-acopio/page";
import { ROLES, ROLE_ID } from "utils/constants";

export default function CollectionPointModal({
  isOpen,
  onClose,
  collectionPoint,
  editMode=false,
  setEditMode,
  setPuntosAcopio,
  puntosAcopio,
  onEditMode,
  children,
  modalTitle
}) {

  const focusInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen && focusInputRef.current) {
      setTimeout(() => {
        focusInputRef.current!.focus();
      }, 0);
    }
  }, [isOpen]);

  const {user} = useContext(UserContext)


  useEffect(()=>{
    setCollectionPointForm({
      nombre: collectionPoint.nombre,
      convenio: collectionPoint.convenio,
      direccion: collectionPoint.direccion,
      ciudad: collectionPoint.ciudad,
      estado: collectionPoint.departamento,
      pais: collectionPoint.pais
    })
  },[editMode])


  const [collectionPointForm, setCollectionPointForm] = useState({
    nombre: '',
    convenio: '',
    direccion: '',
    ciudad: '',
    estado: '',
    pais: ''
  });

  // Handle form submit
  const handleSubmit = (event) => {
    event.preventDefault();
    let newCollectionPoint: PuntoAcopioReq = {
      name: collectionPointForm.nombre,
      agreement: collectionPointForm.convenio,
      address: collectionPointForm.direccion,
      city: collectionPointForm.ciudad,
      state: collectionPointForm.estado,
      country: collectionPointForm.pais,
  };
    //Actualizar punto acopio desde back
    
    let updatedCollectionPoint = updateCollectionPoint(ROLE_ID[user?.type],collectionPoint.id,newCollectionPoint)
    console.log(updateCollectionPoint);

    /*
    const newList = puntosAcopio.map((item : PuntoAcopio) => {
      if (item.id === collectionPoint.id) {
        const updatedItem = {
          ...item,
          
        };

        return updatedItem;
      }

      return item;
    }
    */
    //Actualizar lista de punto de acopio 
    //Quitar edit mode 
  };

  // Update state on form change
  const handleChange = (event) => {
    const { id, value } = event.target;
    setCollectionPointForm(prevState => ({
      ...prevState,
      [id]: value
    }));
  };



  return (
    <Modal
      hasCloseBtn={false}
      isOpen={isOpen}
      onClose={onClose}>

      {collectionPoint && !editMode ? 
      
        <div className="">
          <div className="flex  border-2 border-black bg-[#F62020]">
            <button className="" onClick={onClose}>
             <span className="text-2xl ml-1 mr-4 text-black/50">{"<"}</span> 
            </button>
            <div>
              <span className="text-white text-2xl">{modalTitle}</span>
            </div>
          </div>

          <div className="p-2">
            <p className="text-3xl">{collectionPoint.nombre}</p>
            <p className="text-[#B6B6B6]">{"Nombre usuario punto acopio"}</p>
            <div  className="flex justify-end gap-2">
              <div className="">
                <span className="text-[#B6B6B6] text-xl">Convenio:</span> <span>{collectionPoint.convenio}</span>
              </div>
              <div className="flex flex-row gap-1">
              <Image onClick={onEditMode} src={edit} alt="edit icon"></Image>
              <Image src={upload} alt="edit icon"></Image>
              <Image src={download} alt="edit icon"></Image>
              
              </div>
            </div>

            <hr />
            <div className="flex flex-row gap-3 p-3">
            <Image src={mail} alt="mail"></Image>
            <span>{"danielpalacios.diego@gmail.com"}</span>
            </div>

            <hr />
            <div className="flex flex-row gap-3 p-3">
            <Image src={phone} alt="mail"></Image>
            <span>{"3217095829"}</span>
            </div>
            <hr />
            <div className="flex flex-row gap-3 p-3">
            <Image src={address} alt="address"></Image>
            <span>{collectionPoint.direccion}, {collectionPoint.ciudad}, {collectionPoint.departamento}, {collectionPoint.pais}</span>
            </div>
            <hr />
          </div>

          {children}

        </div>
        :
        collectionPoint && editMode ? 


        <form onSubmit={handleSubmit} className="">
        <div className="flex  border-2 border-black bg-[#F62020]">
          <button  type="button" className="" onClick={onClose}>
           <span className="text-2xl ml-1 mr-4 text-black/50">{"<"}</span> 
          </button>
          <div>
            <span className="text-white text-2xl">Información Punto de acopio </span>
          </div>
        </div>

        <div className="p-2">
          <input id="nombre" value={collectionPointForm.nombre} onChange={handleChange}className="text-3xl border-2 border-black"></input>
          <p className="text-[#B6B6B6]">{"Nombre usuario punto acopio"}</p>
          <div  className="flex justify-end gap-2">
            <div className="">
              <span className="text-[#B6B6B6] text-xl">Convenio:</span> <input id="convenio" className="border-2 border-black" onChange={handleChange} value={collectionPointForm.convenio}></input>
            </div>
            <div className="flex flex-row gap-1">
            <Image onClick={onEditMode} src={edit} alt="edit icon"></Image>
            <Image src={upload} alt="edit icon"></Image>
            <Image src={download} alt="edit icon"></Image>
            </div>
          </div>

          <hr />
          <div className="flex flex-row gap-3 p-3">
          <Image src={mail} alt="mail"></Image>
          <span>{"danielpalacios.diego@gmail.com"}</span>
          </div>

          <hr />
          <div className="flex flex-row gap-3 p-3">
          <Image src={phone} alt="mail"></Image>
          <span>{"3217095829"}</span>
          </div>
          <hr />
          <div className="flex flex-row gap-3 p-3">
          <Image src={address} alt="address"></Image>

          <div>
            <div>
            <label className="text-[#B6B6B6] text-xl" htmlFor="direccion" >Direccion: </label>
          <input className="border-2 border-black" type="text" name="direccion" id="direccion"onChange={handleChange} value={collectionPointForm.direccion} />
            </div>

            <div>
            <label className="text-[#B6B6B6] text-xl"   htmlFor="ciudad">Ciudad: </label>
          <input  className="border-2 border-black"  type="text" name="ciudad" id="ciudad" onChange={handleChange}value={collectionPointForm.ciudad} />
            </div>
            <div>
            <label  className="text-[#B6B6B6] text-xl" htmlFor="estado">Departamento/Provincia/Estado: </label>
          <input  className="border-2 border-black"  type="text" name="estado" id="estado" onChange={handleChange}value={collectionPointForm.estado} />
            </div>
            <div>
            <label className="text-[#B6B6B6] text-xl"  htmlFor="pais">Pais: </label>
          <input  className="border-2 border-black"  type="text" name="pais" id="pais" onChange={handleChange}value={collectionPointForm.pais} />
            </div>
          </div>

          </div>
          <hr />
        </div>

        {children}

      </form>
        
        : ""
      
      }




    </Modal>
  );
};




