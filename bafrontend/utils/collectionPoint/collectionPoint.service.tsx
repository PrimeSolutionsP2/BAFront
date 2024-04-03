export interface PuntoAcopio {
    id: number;
    nombre: string;
    direccion: string;
    convenio?: string;
    ciudad: string;
    departamento: string;
    pais: string;
    estado: string;
}

export async function getCollectionPoints(): Promise<PuntoAcopio[]> {

    const apiUrl = process.env.COLLECTIONS_API;

    if (!apiUrl) {
        throw new Error('COLLECTIONS_api is not defined');
    }
    console.log(apiUrl)
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

            console.log(data1);
            console.log(data2)
            const data = data1.data.concat(data2.data);

            let numAcopio = 0
            const collectionPoints: PuntoAcopio[] = data.map((item: any) => ({
                id: item.id,
                nombre: item.name,
                direccion: item.address,
                convenio: item.agreement,
                ciudad: item.city,
                departamento: item.state,
                pais: item.country,
                estado: item.status.name,
            }));

            console.log(collectionPoints);

            return collectionPoints;
        } else {
            throw new Error(`Error fetching data from API. Status code: ${response.status}`);
        }
    } catch (e) {
        throw new Error(`Error fetching data from API: ${e}`);
    }
}

export async function getCollectionPointRequests(): Promise<PuntoAcopio[]> {

    const apiUrl = process.env.COLLECTIONS_API;

    if (!apiUrl) {
        throw new Error('COLLECTIONS_api is not defined');
    }
    console.log(apiUrl)
    try {
        const activeColPointsRes = await fetch(apiUrl + "collectionPoints/?status=1", {
            method: "get",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const inactiveColPointsRes = await fetch(apiUrl + "collectionPoints/?status=2", {
            method: "get",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (activeColPointsRes.status === 200 && inactiveColPointsRes.status === 200 ) {
            const data1 = await activeColPointsRes.json();
            const data2 = await inactiveColPointsRes.json();

            console.log(data1);
            console.log(data2)
            const data = data1.data.concat(data2.data);

            let numAcopio = 0
            const collectionPoints: PuntoAcopio[] = data.map((item: any) => ({
                id: item.id,
                nombre: item.name,
                direccion: item.address,
                convenio: item.agreement,
                ciudad: item.city,
                departamento: item.state,
                pais: item.country,
                estado: item.status.name,
            }));

            console.log(collectionPoints);

            return collectionPoints;
        } else {
            throw new Error(`Error fetching data from API. Status code: ${response.status}`);
        }
    } catch (e) {
        throw new Error(`Error fetching data from API: ${e}`);
    }
}