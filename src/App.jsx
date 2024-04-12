import { useState } from 'react';
import './App.css'
import { FaEyeSlash } from "react-icons/fa6";
import { IoEyeSharp } from "react-icons/io5";
import { Button, Loader } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { deleteStatusOld, loginAkun } from './store/api';
import { createCookies, generateToken } from './store/utils';
import { useShallow } from 'zustand/react/shallow'
import useAppStore from './store/store';
import Notification from './components/ui/notification';
import useForm from './hooks/useForm';
import useTogglePassword from './hooks/useTogglePassword';
import useNotification from './hooks/useNotification';

export default function App() {

  const [values, handleInputChange, resetForm] = useForm({
    nama_pengguna: '',
    password: '',
  });
  const [typePassword, togglePasswordVisibility] = useTogglePassword();
  const [status, title, handleNotif] = useNotification()

  const [isLoading, setIsLoading] = useState(false)
  const [updateDataUser] = useAppStore(
    useShallow((state) => [state.updateDataUser])
  )




  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    const res = await loginAkun(values)
    if (res.status) {
      const token = generateToken()
      const { data } = res
      updateDataUser(data.data)
      createCookies('user_data', JSON.stringify(data))
      createCookies('token', token)
      handleNotif('success', 'Anda Berhasil Login')
      resetForm()
      await deleteStatusOld()
      navigate('/home')
    } else {
      handleNotif('error', 'Periksa kembali nama pengguna dan password Anda.');
    }
    setIsLoading(false)
  }

  return (
    <div className="w-full min-h-[100vh] max-h-max bg-zinc-900 flex flex-col justify-center items-center gap-6 text-white" >
      <Notification status={status} title={title} />
      <div className="w-[90%] h-max  flex flex-col items-center gap-6">
        <div className="text-center">
          <h1 style={{ fontFamily: 'Satisfy', fontWeight: 400 }} className="text-[2rem]">Snapvibes</h1>
        </div>
        <form onSubmit={handleSubmit} className="w-full  flex flex-col gap-4 items-center h-max ">
          <div className="w-[90%] ">
            <input
              name='nama_pengguna'
              value={values.nama_pengguna}
              onChange={handleInputChange}
              type="text"
              className='w-full p-3 rounded-md outline-none bg-zinc-600 text-[.8rem]'
              placeholder="Email atau nama pengguna"
            />
          </div>
          <div className="w-[90%] h-max bg-zinc-600 rounded-md flex justify-around items-center py-3">
            <input
              name='password'
              value={values.password}
              onChange={handleInputChange}
              type={typePassword}
              className='w-[80%]  outline-none  text-[.8rem] rounded-md bg-transparent'
              placeholder="Kata Sandi"
            />
            {typePassword == 'password' ? (
              <FaEyeSlash className='text-[1.2rem] cursor-pointer text-zinc-400' onClick={togglePasswordVisibility} />
            ) : (
              <IoEyeSharp className='text-[1.2rem] cursor-pointer text-sky-400' onClick={togglePasswordVisibility} />
            )}
          </div>
          <div className="w-[90%]">
            {values.nama_pengguna && values.password ? (
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