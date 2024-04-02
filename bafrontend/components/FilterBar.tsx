

export default function FilterBar({ filterParams, setFilterParams }) {
    return (
        <div className="sm:flex sm:flex-col bg-gray-100 my-3 border-solid border-4  rounded-3xl p-5 border-gray">
            <div>
                <label className="font-bold block" htmlFor="name">Nombre</label>
                <input id="name" type="text" />
            </div>

            <div className="my-3 flex flex-wrap gap-4 sm:justify-between">

                <div>
                <label className="font-bold block" htmlFor="pais">Pais </label>
                <input id="pais" type="text" />
                </div>

                <div>
                <label className="font-bold block " htmlFor="dep">Departamento </label>
                <input id="dep class" type="text" />
                </div>


                <div>
                <label className="font-bold block" htmlFor="ciudad">Ciudad</label>
                <input id="ciudad" type="text" />
                </div>

            </div>
            <div className="  flex flex-wrap gap-3 justify-between">

                <div>
                    <label className="font-bold block" htmlFor="dir">Dirección</label>
                    <input id="dir" type="text" />
                </div>
                <button className=" border-white font-bold  bg-[#FD595A]  text-white  border-solid border-2 rounded-xl p-1">Aplicar filtros</button>
            </div>
        </div>
    );
}