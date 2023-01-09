import { useState } from "react"
import { Link, redirect, useNavigate } from "react-router-dom"
import { Alert } from "../components/Alert"
import axios from 'axios'

import useAuth from "../hooks/useAuth"

export const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [alerta, setAlerta] = useState({})

  const {setAuth} = useAuth()

  const navigate = useNavigate()



  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if([email, password].includes('')){
      setAlerta({
        msg: 'Todos los campos son obligarios',
        error: true
      })
      return
    }

    try {
      const {data} = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/usuarios/login`, {email,password})

      localStorage.setItem('token', data.token)
      setAlerta({})

      setAuth(data)

      navigate('/proyectos')

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
      <h1 className="text-sky-600 font-black text-6xl capitalize ">Inicia Sesión y administra tus {''} <span className="text-slate-700">proyectos</span></h1>

      {msg && <Alert alerta={alerta}/>}

      <form onSubmit={handleSubmit} className="my-10 bg-white shadow rounded-lg px-10 py-10">
        <div className="my-5">
          <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="email">Email</label>
          <input type="email" placeholder="Email de registro" className="w-full mt-3 p-3 border rounded-xl bg-gray-50" id="email" value={email} onChange={e=> setEmail(e.target.value)}/>
        </div>
        <div className="my-5">
          <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="password">Contraseña</label>
          <input type="password" placeholder="Contraseña de registro" className="w-full mt-3 p-3 border rounded-xl bg-gray-50" id="password" value={password} onChange={e=> setPassword(e.target.value)}/>
        </div>

        <input type="submit" value="Iniciar sesión" className="bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors" />
      </form>

      <nav className="lg:flex lg:justify-between ">
        <Link className="block text-center my-5 text-slate-500 uppercase text-sm" to="/registrar">¿No tienes una cuenta? Regístrate</Link>
        <Link className="block text-center my-5 text-slate-500 uppercase text-sm" to="/olvide-password">Olvidé mi contraseña</Link>
      </nav>
    </>
  )
}
