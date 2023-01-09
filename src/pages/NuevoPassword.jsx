import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import axios from 'axios'
import { Alert } from "../components/Alert"

export const NuevoPassword = () => {

  const [password, setPassword] = useState('')
  const [tokenValido, setTokenValido] = useState(false)
  const [alerta, setAlerta] = useState({})
  const [passwordModificado, setpasswordModificado] = useState(false)

  const params = useParams()
  const { token } = params

  useEffect(() => {
    const comprobartToken = async () => {
      try {
        await axios(`${import.meta.env.VITE_BACKEND_URL}/api/usuarios/olvide-password/${token}`)
        setTokenValido(true)

        console.log(data);
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })
        setTokenValido(false)
      }
    }

    comprobartToken()
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault()

    if(password.length < 6) {
      setAlerta({
        msg: 'La contraseña debe tener 6 carácteres mínimo',
        error:true
      })
      return
    }


    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/api/usuarios/olvide-password/${token}`
      const {data} = await axios.post(url,{password})
      setAlerta({
        msg: data.msg,
        error:true
      })
      setpasswordModificado(true)
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error:true
      })
    }
  }



  const {msg} = alerta


  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize ">Restablece tu contraseña y no pierdas acceso a tus {''} <span className="text-slate-700">proyectos</span></h1>

      {msg && <Alert alerta={alerta}/>}

      {tokenValido && (
        <form onSubmit={handleSubmit} className="my-10 bg-white shadow rounded-lg px-10 py-10">
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="password">Nueva contraseña</label>
            <input type="password" placeholder="Restablece tu contraseña" className="w-full mt-3 p-3 border rounded-xl bg-gray-50" id="password" value={password} onChange={e => setPassword(e.target.value)} />
          </div>

          <input type="submit" value="Guardar contraseña" className="bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors" />
        </form>
      )}
      {passwordModificado && (
          <Link className="block text-center my-5 text-slate-500 uppercase text-sm" to="/">Inicia Sesión</Link>
      )}
    </>
  )
}
