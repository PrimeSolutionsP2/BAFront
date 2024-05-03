import { PICKUPS_API, USER_API } from "utils/constants";
import { UserContext } from "context/UserContext";

export interface pickupRequestReq {
    id : string;
    userId: string|undefined;
    collectionPointId : number;
    kilograms : number;
    pickupDate : string;
}

export interface User {
    id: any;
    name: any;
    last_name: any;
    phone_number: any;
    mail: any;
    type: any;
}

export default async function addPickupRequest(payload:pickupRequestReq) {
    try {
        const api_url = "http://localhost:8081/collections/";


        const response = await fetch(api_url+"createRequestCollection", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        let jsonResponse =  await response.json(); 

        console.log(jsonResponse)

        return jsonResponse;


    } catch (error) {
        console.error(`Error sending request: ${error}`);
    }
}

export async function getPickups(role: any, userId: any) {
    try {
        const apiUrl = PICKUPS_API;

        if (!apiUrl) {
            throw new Error('PICKUPS_API is not defined');
        }

        const response = await fetch(role == 2 || role == "RECOLECTOR"? apiUrl+`/requestCollectionsRecollector?recollectorId=${userId}` : apiUrl+"/requestCollectionsAdmin", {
            method: "GET",
        });
        let jsonResponse =  await response.json();
        return jsonResponse
    } catch (error) {
        console.error(`Error sending request: ${error}`);
    }
    
}

export async function getCollectors(){
    const apiUrl = USER_API;

    if (!apiUrl) {
        throw new Error('USER_API is not defined');
    }
    const response = await fetch(apiUrl + "get/users",{
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    const data: User[] = await response.json();
    let collectors = data.filter((user) => user.type === "RECOLECTOR");

    console.log("collectors: ");
    console.log(collectors);
    return collectors;
}