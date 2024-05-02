import { UserData } from "app/asociados/page";
import { COLLECTION_POINT_API } from "utils/constants";

export interface CollectionPointCreateRequest {
  userId: string;
  userName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  name: string;
  agreement: string;
  address: string;
  city: string;
  state: string;
  country: string;
  statusId: number;
}

export interface PuntoAcopio {
    id: number;
    userId: string;
    nombre: string;
    direccion: string;
    convenio?: string;
    ciudad: string;
    departamento: string;
    pais: string;
    estado: string;
}


interface GenericResponse {
    status_code: number;
    data: any;
    message: string;
}

export var userFilter = (user:UserData,puntoAcopio:PuntoAcopio) => {
    if(user?.type == "ADMINISTRADOR") {
      return true
    }else{
      //TODO: DECENT USER AUTORIZATION SCHEME return puntoAcopio.userId == user?.id
      return true
    }
  }

export async function CreateCollectionPoint(request: CollectionPointCreateRequest): Promise<GenericResponse> {
  const res = await fetch(COLLECTION_POINT_API + "request", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request)
  });
  const data = await res.json();
  return data;
}

export async function updateCollectionPointStatus(collectionPointId : number,newStatusId : number){
    try{
    const res = await fetch(COLLECTION_POINT_API + "collectionPoints/" + collectionPointId ,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({statusId : newStatusId})
      });
      const data = await res.json();
      return data;
    } catch (e) {
        throw new Error(`Error fetching data from API: ${e}`);
    }
}

export async function getCollectionPoints(): Promise<PuntoAcopio[]> {

  const apiUrl = COLLECTION_POINT_API;

  if (!apiUrl) {
      throw new Error('COLLECTIONS_api is not defined');
  }
  try {
      const activeColPointsRes = await fetch(apiUrl + "collectionPoints/?status=3", {
          method: "get",
          headers: {
              "Content-Type": "application/json"
          }
      });

      const inactiveColPointsRes = await fetch(apiUrl + "collectionPoints/?status=4", {
          method: "get",
          headers: {
              "Content-Type": "application/json"
          }
      });

      if (activeColPointsRes.status === 200 && inactiveColPointsRes.status === 200 ) {
          const data1 = await activeColPointsRes.json();
          const data2 = await inactiveColPointsRes.json();

          const data = data1.data.concat(data2.data);

          let numAcopio = 0
          const collectionPoints: PuntoAcopio[] = data.map((item: any) => ({
              id: item.id,
              userId:item.userId,
              nombre: item.name,
              direccion: item.address,
              convenio: item.agreement,
              ciudad: item.city,
              departamento: item.state,
              pais: item.country,
              estado: item.status.name,
          }));


          return collectionPoints;
      } else {
          throw new Error(`Error fetching data from API. Status code: ${activeColPointsRes.status}`);
      }
  } catch (e) {
      throw new Error(`Error fetching data from API: ${e}`);
  }
}

export async function getCollectionPointRequests(): Promise<PuntoAcopio[]> {

    const apiUrl = COLLECTION_POINT_API;

    if (!apiUrl) {
        throw new Error('COLLECTIONS_api is not defined');
    }
    try {
        const pendingColPointsRes = await fetch(apiUrl + "collectionPoints/?status=1", {
            method: "get",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (pendingColPointsRes.status === 200) {
            const data = await pendingColPointsRes.json();            
            
            
            let numAcopio = 0
            const collectionPoints: PuntoAcopio[] = data.data.map((item: any) => ({
                id: item.id,
                nombre: item.name,
                direccion: item.address,
                convenio: item.agreement,
                ciudad: item.city,
                departamento: item.state,
                pais: item.country,
                estado: item.status.name,
            }));


          

            return collectionPoints;
        } else {
            throw new Error(`Error fetching data from API. Status code: ${pendingColPointsRes.status}`);
        }
    } catch (e) {
        throw new Error(`Error fetching data from API: ${e}`);
    }
}