import { USER_API } from "utils/constants";

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

interface ErrorResponse {
    code: number;
    message: string;
}

interface UserData {
    id: number;
    name: string;
    mail: string;
    type: number;
}

export interface CreateUserRequest {
    id: any;
    name: any;
    last_name: any;
    phone_number: any;
    mail: any;
    type: any;
}

export interface CreateUserResponse {
    code: number;
    description: string;
}

export async function Login(credentials: LoginRequest): Promise<UserData> {
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

<<<<<<< HEAD:bafrontend/utils/login/user.service.ts
export async function CreateUser(credentials: CreateUserRequest): Promise<CreateUserResponse | ErrorResponse> {
    const apiUrl = USER_API;
=======


export async function CreateUser(credentials: CreateUserRequest): Promise<ErrorResponse> {
    const apiUrl = process.env.USER_API;
>>>>>>> feature/BOT-02:bafrontend/utils/login/user.service.tsx
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

<<<<<<< HEAD:bafrontend/utils/login/user.service.ts
export async function GetUsers(): Promise<UserData[]> {
    const apiUrl = USER_API;
=======


export async function GetUsers(credentials: LoginRequest): Promise<UserData[]> {
    const apiUrl = process.env.USER_API;
>>>>>>> feature/BOT-02:bafrontend/utils/login/user.service.tsx
    if (!apiUrl) {
        throw new Error('USER_API is not defined');
    }
    const data = await fetch(apiUrl + "get/users",{
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    console.log(data)
    const response = await data.json();
    console.log(response)
    return response;
}

export async function DeleteUsers(id: number): Promise<ErrorResponse[]> {
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