import { useState } from 'react';
import './App.css'
import { FaEyeSlash } from "react-icons/fa6";
import { IoEyeSharp } from "react-icons/io5";
import { Button, Loader } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { loginAkun } from './store/api';
import { createCookies, generateToken } from './store/utils';
import { useShallow } from 'zustand/react/shallow'
import useAppStore from './store/store';
import Notification from './components/ui/notification';

export default function App() {
  const [isLoading, setIsLoading] = useState(false)
  const [typePassword, setTypePassword] = useState('password')
  const [updateDataUser] = useAppStore(
    useShallow((state) => [state.updateDataUser])
  )
  const [data, setData] = useState({
    nama_pengguna: '',
    password: ''
  })

  const [status, setStatus] = useState(false)
  const [title, setTitle] = useState(false)

  const handleNotif = (status, title) => {
    setStatus(status)
    setTitle(title)
  }

  const navigate = useNavigate()

  const handleTypePassword = () => {
    { typePassword == 'password' ? setTypePassword('text') : setTypePassword('password') }
  }

  const handleInput = (e) => {
    const { name, value } = e.target;
    setData(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const clearInput = () => {
    const clear = {
      nama_pengguna: '',
      password: ''
    }
    setData(clear)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    const res = await loginAkun(data)
    if (res.status) {
      const token = generateToken()
      const { data } = res
      const userString = JSON.stringify(data);
      updateDataUser(data.data)
      createCookies('token', token)
      createCookies('user_data', userString)
      handleNotif('success', 'Anda Berhasil Login')
      clearInput()
      navigate('/home')
    } else {
      handleNotif('error', res.message)
    }
    setIsLoading(false)
  }



  return (
    <div className="w-full min-h-[100vh] max-h-max bg-zinc-900 flex flex-col justify-center items-center gap-6 text-white" >
      <Notification status={status} title={title} />
      <div className="w-[90%] h-max  flex flex-col items-center gap-6">
        <div className="text-center">
          <h1 style={{ fontFamily: 'Satisfy', fontWeight: 400 }} className="text-[2rem]">Insatagram</h1>
        </div>
        <form onSubmit={handleSubmit} className="w-full  flex flex-col gap-4 items-center h-max ">
          <div className="w-[90%] ">
            <input
              name='nama_pengguna'
              value={data.nama_pengguna}
              onChange={handleInput}
              type="text"
              className='w-full p-3 rounded-md outline-none bg-zinc-600 text-[.8rem]'
              placeholder="Email atau nama pengguna"
            />
          </div>
          <div className="w-[90%] h-max bg-zinc-600 rounded-md flex justify-around items-center py-3">
            <input
              name='password'
              value={data.password}
              onChange={handleInput}
              type={typePassword}
              className='w-[80%]  outline-none  text-[.8rem] rounded-md bg-transparent'
              placeholder="Kata Sandi"
            />
            {typePassword == 'password' ? (
              <FaEyeSlash className='text-[1.2rem] cursor-pointer text-zinc-400' onClick={handleTypePassword} />
            ) : (
              <IoEyeSharp className='text-[1.2rem] cursor-pointer text-sky-400' onClick={handleTypePassword} />
            )}
          </div>
          <div className="w-[90%]">
            {data.nama_pengguna && data.password ? (
              <Button fullWidth size="md" radius='md' type='submit' disabled={isLoading}>
                {isLoading ? (
                  <Loader color="green" type="dots" />
                ) : 'Masuk'}
              </Button>
            ) : (
              <Button className='button' disabled fullWidth size="md" radius='md'>
                Masuk
              </Button>

            )}
          </div>
        </form>
      </div>
      <div className="w-full h-max text-center flex justify-center items-center text-[.7rem] gap-1">
        <p className='text-zinc-400'>Tidak punya akun?</p>
        <p className='cursor-pointer hover:text-sky-500' onClick={() => navigate('/sign')}>Buat Akun</p>
      </div>

    </div>
  )
}