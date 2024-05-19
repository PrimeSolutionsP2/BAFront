import { PICKUPS_API, USER_API,ROLES } from "utils/constants";
import { UserContext } from "context/UserContext";
import { PuntoAcopio } from "utils/collectionPoint/collectionPoint.service";
import { SsgRoute } from "next/dist/build";
import { cloneElement } from "react";
import { GetUsers, User,ResponseStatus } from "utils/login/user.service";



export interface PickupRequestStatus {
    id: number;
    name: string;
}

export interface Pickup {
    dateCreate: string;
    id: number;
    kilograms?: number;
    pickupDate: string;
    pickupRequestStatus: PickupRequestStatus;
    user?: User
    collectionPoint : PuntoAcopio
}


export interface Collector {
    id: string,
    name: string,
    last_name: string,
    phone_number: string,
    mail: string,
    type: string
}

export interface pickupRequestReq {
    id: string;
    userId: string | undefined;
    collectionPointId: number;
    kilograms: number;
    pickupDate: string;
}



export default async function addPickupRequest(payload: pickupRequestReq) {
    try {

        const response = await fetch(PICKUPS_API + "/createRequestCollection", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        let jsonResponse = await response.json();

        console.log(jsonResponse)

        return jsonResponse;


    } catch (error) {
        console.error(`Error sending request: ${error}`);
    }
}

export async function getPickup(pickupId: number,role:number,userId:string) {


    try {
        const apiUrl = PICKUPS_API;

        if (!apiUrl) {
            throw new Error('PICKUPS_API is not defined');
        }

        const response = await fetch(role == 2 ? apiUrl + `/requestCollectionsRecollector?recollectorId=${userId}` : apiUrl + "/requestCollectionsAdmin"+"?id="+pickupId,  {
            method: "GET",
            
        });
        let jsonResponse = await response.json();
        let item = jsonResponse.data[0]


        let pickup: Pickup = {
                dateCreate: item.dateCreate,
                id: item.id,
                kilograms: item.kilograms,
                pickupDate: item.pickupDate,
                pickupRequestStatus: {
                    id: item.pickupRequestStatus.id,
                    name: item.pickupRequestStatus.name,
                }
            };
            if (item.user) {
               
                pickup.user = {
                    id: item.user.id,
                    name: item.user.name,
                    last_name: item.user.lastName,
                    phone_number: item.user.phoneNumber,
                    mail: item.user.email,
                    role: item.user.roleId,
                }
            }

            if(item.collectionPoint){
                pickup.collectionPoint = {
                    id: item.collectionPoint.id,
                    userId: item.collectionPoint.user.id,
                    nombre: item.collectionPoint.name,
                    direccion: item.collectionPoint.address,
                    convenio: item.collectionPoint.agreementCode,
                    ciudad: item.collectionPoint.city,
                    departamento: item.collectionPoint.state,
                    pais: item.collectionPoint.country,
                    estado: item.collectionPoint.statusId
                }
            }
            return pickup;
        

    } catch (error) {
        console.error(`Error sending request: ${error}`);
    }
}

export async function getPickups(role: any, userId: any): Promise<Pickup[] | undefined> {
    try {
        const apiUrl = PICKUPS_API;

        if (!apiUrl) {
            throw new Error('PICKUPS_API is not defined');
        }

        const response = await fetch(role == 2 ? apiUrl + `/requestCollectionsRecollector?recollectorId=${userId}` : apiUrl + "/requestCollectionsAdmin", {
            method: "GET",
        });
        let jsonResponse = await response.json();
        let data = jsonResponse.data

        console.log("fetched",data)

        let pickups: Pickup[] = data.map((item: any) => {

            let actualPickup: Pickup = {
                dateCreate: item.dateCreate,
                id: item.id,
                kilograms: item.kilograms,
                pickupDate: item.pickupDate,
                pickupRequestStatus: {
                    id: item.pickupRequestStatus.id,
                    name: item.pickupRequestStatus.name,
                }
            };
            if (item.user) {
                actualPickup.user = {
                    id: item.user.id,
                    name: item.user.name,
                    last_name: item.user.lastName,
                    phone_number: item.user.phoneNumber,
                    mail: item.user.email,
                    role: item.user.roleId,
                }
            }

            if(item.collectionPoint){
                actualPickup.collectionPoint = {
                    id: item.collectionPoint.id,
                    userId: item.collectionPoint.user.id,
                    nombre: item.collectionPoint.name,
                    direccion: item.collectionPoint.address,
                    convenio: item.collectionPoint.agreementCode,
                    ciudad: item.collectionPoint.city,
                    departamento: item.collectionPoint.state,
                    pais: item.collectionPoint.country,
                    estado: item.collectionPoint.statusId
                }
            }


            return actualPickup
        })


        return pickups

    } catch (error) {
        console.error(`Error sending request: ${error}`);
    }

}

export async function getCollectors() {
    const apiUrl = USER_API;

    if (!apiUrl) {
        throw new Error('USER_API is not defined');
    }
    const response = await fetch(apiUrl + "get/users", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    const data: User[] = await response.json();
    let collectors = data.filter((user) => user.role === 2);
    return collectors;
}

export async function updatePickupRequest(pickupRequest:Pickup,collectorId ,pickupDate ) {

    let pickupRequestReq = {pickupRequestId: pickupRequest.id, recollectorId:collectorId, pickupDate: pickupDate}


    try {

        const response = await fetch(PICKUPS_API + "/updateRecollectorOrPickupDate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(pickupRequestReq),
        });
        
        
        let jsonResponse = await response.json();
     
        
        let responseStatus : ResponseStatus = {
            code: jsonResponse.statusCode,
            message: jsonResponse.message
        }


        return responseStatus;


    } catch (error) {
        return {code:500, message: error}
    }
}


export async function completePickupRequest(pickupResquestId:number,kilograms:number) {
    let pickupRequestReq = {pickupRequestId: pickupResquestId, kilogramsRecolected:kilograms}


    try {

        const response = await fetch(PICKUPS_API + "/completeRequestCollection", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(pickupRequestReq),
        });

        let jsonResponse = await response.json();
        return jsonResponse;


    } catch (error) {
        console.error(`Error sending request: ${error}`);
    }
    
}
