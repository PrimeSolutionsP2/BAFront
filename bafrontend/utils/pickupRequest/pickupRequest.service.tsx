export interface pickupRequestReq {
    id : string;
    userId: string|undefined;
    collectionPointId : number;
    kilograms : number;
    pickupDate : string;
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