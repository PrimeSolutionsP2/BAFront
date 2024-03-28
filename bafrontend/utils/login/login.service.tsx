interface LoginRequest {
    mail: string;
    password: string;
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

export default async function Login(credentials: LoginRequest): Promise<LoginResponse | ErrorResponse> {
    const apiUrl = process.env.USER_API;
    if (!apiUrl) {
        throw new Error('USER_API is not defined');
    }
    const data = await fetch(apiUrl,{
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
    });
    const response = await data.json();
    return response;
}