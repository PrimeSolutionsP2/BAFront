export default function Page() {
    return(
    <div>
        <div className="flex flex-col gap-3 justify-center items-center shadow-xl w-1/4 m-auto mt-[10%] p-5">
            <h3 className="text-3xl font-bold text-var-red">Inicio de Sesion</h3>
            <form action="" className="flex flex-col justify-center items-center gap-3">
                <div className="flex flex-col items-center">
                    <label htmlFor="mail">Correo</label>
                    <input type="text" name="mail" id="mail" className="border border-solid border-var-blue rounded-sm" />
                </div>
                <div className="flex flex-col items-center">
                    <label htmlFor="password">Contraseña</label>
                    <input type="password" name="password" id="password" className="border border-solid border-var-blue rounded-sm" />
                </div>
                <button className="p-1 rounded-sm bg-var-red text-white">Ingresar</button>
            </form>
        </div>
    </div>)
}