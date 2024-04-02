interface LoginRequest {
    mail?: string;
    password?: string;
}

interface LoginResponse {
    id: number;
    name: string;
    mail: string;
    type: string;
}

interface ErrorResponse {
    code: number;
    message: string;
}

interface UserData {
    id: number;
    name: string;
    mail: string;
    type: string;
}

interface CreateUserRequest {
    mail: string;
    password: string;
    type: string;
}

export async function Login(credentials: LoginRequest): Promise<LoginResponse | ErrorResponse> {
    const apiUrl = process.env.USER_API;
    if (!apiUrl) {
        throw new Error('USER_API is not defined');
    }
    const data = await fetch(apiUrl + "/login/user",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
    });
    const response = await data.json();
    return response;
}



export async function CreateUser(credentials: CreateUserRequest): Promise<ErrorResponse> {
    const apiUrl = process.env.USER_API;
    if (!apiUrl) {
        throw new Error('USER_API is not defined');
    }
    const data = await fetch(apiUrl + "/login/user",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
    });
    const response = await data.json();
    return response;
}



export async function GetUsers(credentials: LoginRequest): Promise<UserData[]> {
    const apiUrl = process.env.USER_API;
    if (!apiUrl) {
        throw new Error('USER_API is not defined');
    }
    const data = await fetch(apiUrl + "/get/users",{
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
    });
    const response = await data.json();
    return response;
}

export async function DeleteUsers(id: number): Promise<ErrorResponse[]> {
    const apiUrl = process.env.USER_API;
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