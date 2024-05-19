import { USER_API } from "utils/constants";
import { Pickup} from "utils/pickupRequest/pickupRequest.service";

interface LoginRequest {
    mail?: string;
    password?: string;
}

interface LoginResponse {
    id: number;
    name: string;
    mail: string;
    type: number;
}


export interface ResponseStatus {
    code: number;
    message: string;
}

export interface User {
    last_name: any;
    phone_number: any;
    id: string;
    name: string;
    mail: string;
    role: number;
}

export interface CreateUserRequest {
    id: any;
    name: any;
    last_name: any;
    phone_number: any;
    mail: any;
    role: number;
}

export interface CreateUserResponse {
    code: number;
    description: string;
}

export async function Login(credentials: LoginRequest): Promise<User> {
    const apiUrl = USER_API;
    if (!apiUrl) {
        throw new Error('USER_API is not defined');
    }

    const data = await fetch(apiUrl + "login/user",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
    });
    const response = await data.json();
    return response;

}


export async function CreateUser(credentials: CreateUserRequest): Promise<CreateUserResponse | ResponseStatus> {
    const apiUrl = USER_API;

    if (!apiUrl) {
        throw new Error('USER_API is not defined');
    }
    const data = await fetch(apiUrl + "create/user",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
    });
    const response = await data.json();
    return response;
}

export async function GetUsers(userId=""): Promise<User[]| User> {
    const apiUrl = USER_API;

    if (!apiUrl) {
        throw new Error('USER_API is not defined');
    }
    const data = await fetch(apiUrl + `get/users/${userId}`,{
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    const response = await data.json();

    console.log(response)
    
    return response;
}

export async function DeleteUsers(id: number): Promise<ResponseStatus[]> {
    const apiUrl = USER_API;
    if (!apiUrl) {
        throw new Error('USER_API is not defined');
    }
    const data = await fetch(apiUrl + "/delete/user/" + id,{
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }   
    });
    const response = await data.json();
    return response;
}

export async function notifyUser(userEmail:string,subject:string,body:string) {

    const emailReq = {email:userEmail,subject:subject,body:body}
    const apiUrl = USER_API;
    console.log(emailReq)
    if (!apiUrl) {
        throw new Error('USER_API is not defined');
    }
    const data = await fetch(apiUrl + "send/email",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(emailReq)
    });

    const response = await data.json();
    console.log(response)
    return response;
    
}

export async function notifyPickupSchedule(pickup:Pickup, userId:string){
    
    const userResponse = await GetUsers(pickup.collectionPoint.userId);
    const user : User = userResponse;
    console.log(user)
    const parsedDate = pickup.pickupDate.split("T");

    const body = `Se solicita recoleccion de punto de acopio el dia ${parsedDate[0]} a las ${parsedDate[1]} \n
                Punto de acopio: ${pickup.collectionPoint.nombre}
                Ubicacion: ${pickup.collectionPoint.direccion} ${pickup.collectionPoint.ciudad},${pickup.collectionPoint.departamento},${pickup.collectionPoint.pais}\n
                \n
                Representante: ${user.name} ${user.last_name}  
                Telefono: ${user.phone_number}  
                Correo electrónico: ${user.mail}
                `;

    notifyUser("danielpalacios.diego@gmail.com","Solicitud de recoleccion agendada",
                body)
    
    console.log("Sent email",body,"to",pickup.user?.mail)
}