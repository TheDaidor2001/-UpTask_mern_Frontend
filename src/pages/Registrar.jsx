import { Link } from "react-router-dom"
import { useState } from "react"
import { Alert } from "../components/Alert"
import axios from 'axios'

export const Registrar = () => {

  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repetirPassword, setrepetirPassword] = useState('')
  const [alerta, setAlerta] = useState({})


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if([nombre,email,password,repetirPassword].includes('')){
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      })
      return
    }

    if(password !== repetirPassword) {
      setAlerta({
        msg: 'Las contraseñas no coinciden',
        error: true
      })
      return
    }

    if(password.length < 6) {
      setAlerta({
        msg: 'La contraseña es muy corta, agrega mínimo 6 carácteres',
        error: true
      })
      return
    }

    setAlerta({})


    //Crear el usuario en la api

    try {
      const {data} = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/usuarios`, {
      nombre, email, password})

      setAlerta({
        msg: data.msg,
        error: false
      })

      setNombre('')
      setEmail('')
      setPassword('')
      setrepetirPassword('')

    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }


  }


  const {msg} = alerta


  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize ">Crea tu cuenta y administra tus {''} <span className="text-slate-700">proyectos</span></h1>


      {msg && <Alert alerta={alerta} />}
      <form onSubmit={handleSubmit} className="my-10 bg-white shadow rounded-lg px-10 py-10">
        <div className="my-5">
          <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="nombre">Nombre</label>
          <input type="text" placeholder="Ingresa tu nombre" className="w-full mt-3 p-3 border rounded-xl bg-gray-50" id="nombre" value={nombre} onChange={e => setNombre(e.target.value)}/>
        </div>
        <div className="my-5">
          <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="email">Email</label>
          <input type="email" placeholder="Email de registro" className="w-full mt-3 p-3 border rounded-xl bg-gray-50" id="email" value={email} onChange={ e => setEmail(e.target.value)} />
        </div>
        <div className="my-5">
          <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="password">Contraseña</label>
          <input type="password" placeholder="Contraseña de registro" className="w-full mt-3 p-3 border rounded-xl bg-gray-50" id="password" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <div className="my-5">
          <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="password2">Repetir contraseña</label>
          <input type="password" placeholder="Repite tu contraseña" className="w-full mt-3 p-3 border rounded-xl bg-gray-50" id="password2" value={repetirPassword} onChange={e => setrepetirPassword(e.target.value)} />
        </div>
        

        <input type="submit" value="Crear cuenta" className="bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors" />
      </form>

      <nav className="lg:flex lg:justify-between ">
        <Link className="block text-center my-5 text-slate-500 uppercase text-sm" to="/registrar">¿Ya tienes una cuenta? Inicia Sesión</Link>
        <Link className="block text-center my-5 text-slate-500 uppercase text-sm" to="/olvide-password">Olvidé mi contraseña</Link>
      </nav>
    </>
  )
}
