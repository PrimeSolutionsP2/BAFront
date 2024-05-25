import {
  FormEvent,
  ReactElement,
  cloneElement,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Modal from "./Modal";
import {
  PuntoAcopio,
  PuntoAcopioReq,
  updateCollectionPoint,
  UploadIdFile,
  UploadPlaceImage,
} from "utils/collectionPoint/collectionPoint.service";
import StateCard from "./StateCard";
import { chooseColor } from "utils/collectionPoint/utils";
import addPickupRequest, {
  pickupRequestReq,
} from "utils/pickupRequest/pickupRequest.service";
import { UserContext } from "context/UserContext";
import edit from "public/icons/edit.svg";
import upload from "public/icons/upload.svg";
import download from "public/icons/download.svg";
import mail from "public/icons/mail.svg";
import address from "public/icons/address.svg";
import phone from "public/icons/phone.svg";
import puntosAcopioIcon from "public/icons/puntos-acopio-icon-b.svg";
import Image from "next/image";
import PuntosAcopio from "app/puntos-acopio/page";
import { COLLECTION_POINT_API, ROLES, ROLE_ID } from "utils/constants";
import { GetUsers, User } from "utils/login/user.service";

export default function CollectionPointModal({
  isOpen,
  onClose,
  collectionPoint,
  editMode = false,
  onEditMode,
  children,
  modalTitle,
  setCollectionPoint,
  setEditMode
}: { isOpen: boolean, onClose: any, collectionPoint: PuntoAcopio, editMode: boolean,
 onEditMode:any,children: ReactElement | null, modalTitle:string, setCollectionPoint:Function, setEditMode:Function}) {
  const focusInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen && focusInputRef.current) {
      setTimeout(() => {
        focusInputRef.current!.focus();
      }, 0);
    }
  }, [isOpen]);

  const { user } = useContext(UserContext);

  useEffect(() => {
    setCollectionPointForm({
      nombre: collectionPoint.nombre,
      convenio: collectionPoint.convenio,
      direccion: collectionPoint.direccion,
      ciudad: collectionPoint.ciudad,
      estado: collectionPoint.departamento,
      pais: collectionPoint.pais,
    });
  }, [editMode]);

  useEffect(()=> {
    if(isOpen){
    const fetchUser = async () =>{
      console.log("cp",collectionPoint)
      let user_cp : User =  await GetUsers(collectionPoint.userId)
      console.log("user_cp",user_cp)
      setUser(user_cp);

    }

    fetchUser();
  }
  },[isOpen])

  const [collectionPointForm, setCollectionPointForm] = useState({
    nombre: "",
    convenio: "",
    direccion: "",
    ciudad: "",
    estado: "",
    pais: "",
    userIdFile: false,
    placeImage: false,
  });

  const [cpUser,setUser] = useState<User>({id:"",name:"",last_name:"",role:0,mail:"",phone_number:""});

  // Handle form submit
  const handleSubmit = async (event) => {
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

    let updatedCollectionPoint = (await updateCollectionPoint(
      ROLES[user.role],
      collectionPoint.id,
      newCollectionPoint
    )).data;
    console.log("update",updatedCollectionPoint);

    
    setCollectionPoint({    id: updatedCollectionPoint.id,
      userId: updatedCollectionPoint.userId,
      nombre: updatedCollectionPoint.name,
      direccion: updatedCollectionPoint.address,
      convenio: updatedCollectionPoint.agreement,
      ciudad: updatedCollectionPoint.city,
      departamento: updatedCollectionPoint.state,
      pais: updatedCollectionPoint.country,
      estado: updatedCollectionPoint.status.name,})
      
      setEditMode(false);
      
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
    setCollectionPointForm((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  //FILE HANDLING

  const handleFileChangeUserID = (event: any) => {
    UploadIdFile(event.target.files[0], collectionPoint.id, ROLES[user.role]);
  };

  const handleFileChangePlaceImage = (event: any) => {
    UploadPlaceImage(event.target.files[0], collectionPoint.id, ROLES[user.role]);
  };

  const downloadFile = (fileName: string, target: string = '_blank', features?: string) => [
    window.open(COLLECTION_POINT_API + `collectionPoints/file/${fileName}`, target, features)
  ]

  console.log(collectionPoint)

  return (
    <Modal hasCloseBtn={false} isOpen={isOpen} onClose={onClose}>
      {collectionPoint && !editMode ? (
        <div className="">
          <div className="flex  border-2 border-black bg-[#FD595A]">
            <button className="" onClick={onClose}>
              <span className="text-2xl ml-1 mr-4 text-black/50">{"<"}</span>
            </button>
            <div>
              <span className="text-white text-2xl">{modalTitle}</span>
            </div>
          </div>

          <div className="p-2">
            <p className="text-3xl">{collectionPoint.nombre}</p>
            <p className="text-[#B6B6B6]">{cpUser.name + " " + cpUser.last_name}</p>
            <div className="flex gap-2">
              <div className="flex flex-row justify-start">
                <p className="text-[#B6B6B6] text-xl">
                  {"Convenio: " + collectionPoint.convenio}
                </p>
              </div>
              <div className="flex flex-row gap-1">
                <Image
                  className="cursor-pointer"
                  onClick={onEditMode}
                  src={edit}
                  alt="edit icon"
                ></Image>
                <Image src={upload} alt="edit icon"></Image>
              </div>
            </div>

            <hr />
            <div className="flex flex-row gap-3 p-3">
              <Image src={mail} alt="mail"></Image>
              <span>{cpUser.mail}</span>
            </div>

            <hr />
            <div className="flex flex-row gap-3 p-3">
              <Image src={phone} alt="mail"></Image>
              <span>{cpUser.phone_number}</span>
            </div>
            <hr />
            <div className="flex flex-row gap-3 p-3">
              <Image src={address} alt="address"></Image>
              <span>
                {collectionPoint.direccion}, {collectionPoint.ciudad},{" "}
                {collectionPoint.departamento}, {collectionPoint.pais}
              </span>
            </div>
            <hr />
            <div className="flex flex-row gap-3 p-3">
              <Image src={puntosAcopioIcon} alt="puntosAcopioIcon"></Image>
              <p>
                {collectionPoint.userIdFile ? (
                  <div className="flex flex-row gap-1 items-center">
                    Descargar Id de usuario{" "}
                    <span>
                      <Image
                        className="cursor-pointer"
                        src={download}
                        alt="edit icon"
                        onClick={() => downloadFile(`ID-${collectionPoint.id}.pdf`)}
                      ></Image>
                    </span>
                  </div>
                ) : (
                  "No hay Id de usuario cargado"
                )}
              </p>
            </div>
            <hr />
            <div className="flex flex-row gap-3 p-3">
              <Image src={puntosAcopioIcon} alt="puntosAcopioIcon"></Image>
              <p>
                {collectionPoint.placeImage ? (
                  <div className="flex flex-row gap-1 items-center">
                    Descargar imagen del lugar{" "}
                    <span>
                      <Image
                        className="cursor-pointer"
                        src={download}
                        alt="edit icon"
                        onClick={() => downloadFile(`IMAGE-${collectionPoint.id}.pdf`)}
                      ></Image>
                    </span>
                  </div>
                ) : (
                  "No hay imagen del lugar cargada"
                )}
              </p>
            </div>
          </div>

          {children}
        </div>
      ) : collectionPoint && editMode ? (
        <form onSubmit={handleSubmit} className="">
          <div className="flex  border-2 border-black bg-[#F62020]">
            <button type="button" className="" onClick={onClose}>
              <span className="text-2xl ml-1 mr-4 text-black/50">{"<"}</span>
            </button>
            <div>
              <span className="text-white text-2xl">
                Información Punto de acopio{" "}
              </span>
            </div>
          </div>

          <div className="p-2">
            <input
              id="nombre"
              value={collectionPointForm.nombre}
              onChange={handleChange}
              className="text-3xl border-2 border-black"
            ></input>
            <p className="text-[#B6B6B6]">{"Nombre usuario punto acopio"}</p>
            <div className="flex justify-end gap-2">
              <div className="">
                <span className="text-[#B6B6B6] text-xl">Convenio:</span>{" "}
                <input
                  id="convenio"
                  className="border-2 border-black"
                  onChange={handleChange}
                  value={collectionPointForm.convenio}
                ></input>
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
              <span>{cpUser.mail}</span>
            </div>

            <hr />
            <div className="flex flex-row gap-3 p-3">
              <Image src={phone} alt="mail"></Image>
              <span>{cpUser.phone_number}</span>
            </div>
            <hr />
            <div className="flex flex-row gap-3 p-3">
              <Image src={address} alt="address"></Image>

              <div>
                <div>
                  <label className="text-[#B6B6B6] text-xl" htmlFor="direccion">
                    Direccion:{" "}
                  </label>
                  <input
                    className="border-2 border-black"
                    type="text"
                    name="direccion"
                    id="direccion"
                    onChange={handleChange}
                    value={collectionPointForm.direccion}
                  />
                </div>

                <div>
                  <label className="text-[#B6B6B6] text-xl" htmlFor="ciudad">
                    Ciudad:{" "}
                  </label>
                  <input
                    className="border-2 border-black"
                    type="text"
                    name="ciudad"
                    id="ciudad"
                    onChange={handleChange}
                    value={collectionPointForm.ciudad}
                  />
                </div>
                <div>
                  <label className="text-[#B6B6B6] text-xl" htmlFor="estado">
                    Departamento/Provincia/Estado:{" "}
                  </label>
                  <input
                    className="border-2 border-black"
                    type="text"
                    name="estado"
                    id="estado"
                    onChange={handleChange}
                    value={collectionPointForm.estado}
                  />
                </div>
                <div>
                  <label className="text-[#B6B6B6] text-xl" htmlFor="pais">
                    Pais:{" "}
                  </label>
                  <input
                    className="border-2 border-black"
                    type="text"
                    name="pais"
                    id="pais"
                    onChange={handleChange}
                    value={collectionPointForm.pais}
                  />
                </div>
                <div>
                  <label className="text-[#B6B6B6] text-xl" htmlFor="pais">
                    Archivo de ID:{" "}
                  </label>
                  <input
                    className="border-2 border-black"
                    type="file"
                    name="idFile"
                    id="idFile"
                    onChange={handleFileChangeUserID}
                  />
                </div>
                <div>
                  <label className="text-[#B6B6B6] text-xl" htmlFor="pais">
                    Imagen del lugar:{" "}
                  </label>
                  <input
                    className="border-2 border-black"
                    type="file"
                    name="placeImage"
                    id="placeImage"
                    onChange={handleFileChangePlaceImage}
                  />
                </div>
              </div>
            </div>
            <hr />
          </div>

          {children}
        </form>
      ) : (
        ""
      )}
    </Modal>
  );
}
