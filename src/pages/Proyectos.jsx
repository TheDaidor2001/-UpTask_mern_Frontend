import { useEffect } from "react";
import { PreviewProyecto } from "../components/PreviewProyecto";
import useProyectos from "../hooks/useProyectos"
import { Alert } from "../components/Alert";



export const Proyectos = () => {


  const {proyectos, alerta} = useProyectos()



  

  const {msg} = alerta

  return (
    <>
        <h1 className="text-4xl font-black">Proyectos</h1>

        {msg && <Alert alerta={alerta} />}

        <div className="bg-white shadow mt-10 rounded-lg">
            {proyectos.length ? 
              proyectos.map(proyecto => (
                <PreviewProyecto key={proyecto._id} proyecto={proyecto} />
              ))
            : <p className="text-center text-gray-600 uppercase p-5">No hay proyectos aún</p>}
        </div>
    </>
  )
}
