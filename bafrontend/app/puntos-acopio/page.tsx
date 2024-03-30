import StateCard from "@/components/StateCard";
import TitleBar from "@/components/TitleBar";

interface PuntoAcopio {
    id: number;
    nombre:string;
    direccion: string;
    convenio? : string;
    ciudad: string;
    departamento:string;
    pais:string;
    estado:boolean;
}


export default function PuntosAcopio() {
    let puntosAcopio: PuntoAcopio[] = [
        {id: 1, nombre: 'Punto 1', direccion: 'Calle 10 #20-30', ciudad: 'Bogotá', departamento: 'Cundinamarca', pais: 'Colombia', estado: true},
        {id: 2, nombre: 'Punto 2', direccion: 'Avenida 5 #15-25', ciudad: 'Medellín', departamento: 'Antioquia', pais: 'Colombia', estado: true},
        {id: 3, nombre: 'Punto 3', direccion: 'Carrera 7 #45-67', ciudad: 'Cali', departamento: 'Valle del Cauca', pais: 'Colombia', estado: false},
        {id: 4, nombre: 'Punto 4', direccion: 'Calle 70 #80-90', ciudad: 'Barranquilla', departamento: 'Atlántico', pais: 'Colombia', estado: true},
        {id: 5, nombre: 'Punto 5', direccion: 'Avenida 9 #10-11', ciudad: 'Cartagena', departamento: 'Bolívar', pais: 'Colombia', estado: false},
        {id: 6, nombre: 'Punto 6', direccion: 'Carrera 12 #13-14', ciudad: 'Bucaramanga', departamento: 'Santander', pais: 'Colombia', estado: true},
        {id: 7, nombre: 'Punto 7', direccion: 'Calle 15 #16-17', ciudad: 'Pereira', departamento: 'Risaralda', pais: 'Colombia', estado: false},
        {id: 8, nombre: 'Punto 8', direccion: 'Avenida 18 #19-20', ciudad: 'Manizales', departamento: 'Caldas', pais: 'Colombia', estado: true},
        {id: 9, nombre: 'Punto 9', direccion: 'Carrera 21 #22-23', ciudad: 'Ibagué', departamento: 'Tolima', pais: 'Colombia', estado: false},
        {id: 10, nombre: 'Punto 10', direccion: 'Calle 24 #25-26', ciudad: 'Neiva', departamento: 'Huila', pais: 'Colombia', estado: true}
    ];
    


    return (
        <>
            <TitleBar title={"Puntos de acopio"} />
            <div className="w-full p-8">
                <table className="centered-table shadow p-2 table-auto w-full">
                    <thead className="text-3xl">
                        <tr>
                            <th>
                                Nombre
                            </th>
                            <th>
                                Direccion
                            </th>

                            <th>
                                Pais
                            </th>

                            <th>
                                Departamento
                            </th>

                            <th>
                                Ciudad
                            </th>

                            <th>
                                Estado
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {puntosAcopio.map((puntoAcopio) => (
                        <tr>
                            <td>
                                {puntoAcopio.nombre5}
                            </td>
                            <td>
                                {puntoAcopio.direccion}
                            </td>
                            <td>
                                {puntoAcopio.pais}
                            </td>
                            <td>
                                {puntoAcopio.departamento}
                            </td>
                            <td>
                                {puntoAcopio.ciudad}
                            </td>

                            <td className="">
                                {puntoAcopio.estado ? <StateCard className="w-max mx-auto" statusString="Disponible" color="green"></StateCard> : <StateCard className="w-max mx-auto" statusString="No disponible" color="red"></StateCard>}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    )

}