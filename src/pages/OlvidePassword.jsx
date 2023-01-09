import { useState } from "react"
import { Link } from "react-router-dom"
import { Alert } from "../components/Alert"
import axios from 'axios'




export const OlvidePassword = () => {

  const [email, setEmail] = useState('')
  const [alerta, setAlerta] = useState({})



  const handleSubmit = async (e) => {
    e.preventDefault();

    if(email === '' || email.length < 6) {
      setAlerta({
        msg: 'El email es obligatorio',
        error: true
      })
      return
    }

    try {

      const {data} = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/usuarios/olvide-password`, {email})

      setAlerta({
        msg: data.msg,
        error: false
      })

    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      });
    }
  }

  const {msg} = alerta

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize ">Recupera tu acceso y no pierdas tus {''} <span className="text-slate-700">proyectos</span></h1>

      {msg && <Alert alerta={alerta} />}

      <form onSubmit={handleSubmit} className="my-10 bg-white shadow rounded-lg px-10 py-10">
        <div className="my-5">
          <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="email">Email</label>
          <input type="email" placeholder="Email de registro" className="w-full mt-3 p-3 border rounded-xl bg-gray-50" id="email" value={email} onChange={e => setEmail(e.target.value)} />
        </div>

        <input type="submit" value="Enviar instrucciones" className="bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors" />
      </form>

      <nav className="lg:flex lg:justify-between ">
        <Link className="block text-center my-5 text-slate-500 uppercase text-sm" to="/registrar">¿Ya tienes una cuenta? Inicia Sesión</Link>
        <Link className="block text-center my-5 text-slate-500 uppercase text-sm" to="/registrar">¿No tienes una cuenta? Regístrate</Link>
      </nav>
    </>
  )
}
