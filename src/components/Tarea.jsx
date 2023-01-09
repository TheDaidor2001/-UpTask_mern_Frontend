import { formatearFecha } from "../helpers/formatearFecha"
import useProyectos from "../hooks/useProyectos"
import useAdmin from "../hooks/useAdmin"

export const Tarea = ({ tarea }) => {


    const { descripcion, nombre, prioridad, fechaEntrega, _id, estado } = tarea

    const { handleModalEditarTarea, handleEliminarTarea, completarTarea } = useProyectos()
    const admin = useAdmin()

    return (
        <div className="border-b p-5 flex justify-between items-center">
            <div>
                <p className="mb-1 text-xl">{nombre}</p>
                <p className="mb-1 text-sm text-gray-500 uppercase">{descripcion}</p>
                <p className="mb-1 text-sm">{formatearFecha(fechaEntrega)}</p>
                <p className="mb-1 text-xl text-gray-600">Proitidad: {prioridad}</p>
                
            </div>
            <div className="flex flex-col lg:flex-row gap-2">
                {admin && (
                    <button className="bg-indigo-700 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg" onClick={() => handleModalEditarTarea(tarea)}>
                        Editar
                    </button>
                )}

                <button className={`${estado ? 'bg-sky-600' : 'bg-gray-600'} px-4 py-3 text-white uppercase font-bold text-sm rounded-lg`} onClick={() => completarTarea(_id)}>
                    {estado ? 'Completada' : 'Incompleta'}
                </button>

                {admin && (
                    <button className="bg-red-700 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg" onClick={() => handleEliminarTarea(tarea)}>
                        Eliminar
                    </button>
                )}
            </div>
        </div>
    )
}
