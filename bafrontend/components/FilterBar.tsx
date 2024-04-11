import { CollectionPointfilterParams } from "app/puntos-acopio/CollectionPoints";

interface IFilterBar {
    filterParams: CollectionPointfilterParams
    setFilterParams: Function
}

export default function FilterBar({ filterParams, setFilterParams }: IFilterBar) {
    return (
        <div className=" flex flex-wrap  flex-col  text-center md:flex-row md:text-justify  gap-2 bg-gray-100 my-3 border-solid border-4  rounded-3xl p-5 border-gray">
            
                <div>

                    <label className="font-bold block" htmlFor="name">Nombre</label>
                    <input id="name" type="text" value={filterParams.name} onChange={(e) => {
                        setFilterParams({
                            ...filterParams,
                            name: e.target.value
                        })
                    }} />
                </div>

                <div>
                    <label className="font-bold block" htmlFor="convenio">Convenio</label>
                    <input id="agreement" type="text" value={filterParams.agreement} onChange={(e) => {
                        setFilterParams({
                            ...filterParams,
                            agreement: e.target.value
                        })
                    }} />
                </div>
           


                <div>
                    <label className="font-bold block" htmlFor="pais">Pais </label>
                    <input id="pais" value={filterParams.country} type="text" onChange={(e) => {
                        setFilterParams({
                            ...filterParams,
                            country: e.target.value
                        })
                    }} />
                </div>

                <div>
                    <label className="font-bold block " htmlFor="dep">Departamento </label>
                    <input value={filterParams.state} id="dep class" type="text" onChange={(e) => {
                        setFilterParams({
                            ...filterParams,
                            state: e.target.value
                        })
                    }} />
                </div>


                <div>
                    <label className="font-bold block" htmlFor="ciudad">Ciudad</label>
                    <input value={filterParams.city} id="ciudad" type="text" onChange={(e) => {
                        setFilterParams({
                            ...filterParams,
                            city: e.target.value
                        })
                    }} />
                </div>

            
       

                <div>
                    <label className="font-bold block" htmlFor="dir">Dirección</label>
                    <input id="dir" type="text" value={filterParams.address} onChange={(e) => {
                        setFilterParams({
                            ...filterParams,
                            address: e.target.value
                        })
                    }} />
                </div>


                <div>
                    <label className="font-bold block" htmlFor="status">Estado</label>
                    <input id="status" type="text" value={filterParams.status} onChange={(e) => {
                        setFilterParams({
                            ...filterParams,
                            status : e.target.value
                        })
                    }} />
                </div>
                
        </div>
    );
}