import { useState } from 'react';
import { FaEyeSlash } from "react-icons/fa6";
import { IoEyeSharp } from "react-icons/io5";
import { Button, Loader } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { registerAkun } from '../../services/useApi';
import useForm from '../../hooks/useForm';
import useTogglePassword from '../../hooks/useTogglePassword';
import useNotification from '../../hooks/useNotification';
import Notification from '../../components/ui/notification';


export default function Sign() {
  const [values, handleInputChange, resetForm] = useForm({
    username: '',
    nama_pengguna: '',
    email: '',
    password: ''
  });
  const [typePassword, togglePasswordVisibility] = useTogglePassword();
  const [isLoading, setIsLoading] = useState(false)
  const [status, title, handleNotif] = useNotification()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    const { nama_pengguna, password } = values

    if (password.length < 6) {
      handleNotif('error', 'Password min 6 huruf/angka')
    } else if (nama_pengguna.includes(" ")) {
      handleNotif('error', 'Nama pengguna tidak boleh menggunakan spasi')
    } else {
      const res = await registerAkun(values)
      if (res.status) {
        handleNotif('success', 'Berhasil Membuat Akun')
        navigate('/')
        resetForm()
      } else {
        handleNotif('error', res.message)
      }
    }
    setIsLoading(false)
  }

  return (
    <div className="w-full min-h-[100vh] max-h-max bg-zinc-900 flex flex-col justify-center items-center gap-6 text-white" style={{ fontFamily: 'Montserrat', fontWeight: 400 }}>
      <Notification status={status} title={title} />
      <div className="w-[90%] h-max  flex flex-col items-center gap-6">
        <div className="text-center">
          <h1 style={{ fontFamily: 'Satisfy', fontWeight: 400 }} className="text-[2rem]">Snapvibes</h1>
        </div>
        <form onSubmit={handleSubmit} className="w-full  flex flex-col gap-4 items-center h-max ">
          <div className="w-[90%] ">
            <input
              name='username'
              value={values.username}
              onChange={handleInputChange}
              type="text"
              className='w-full p-3 rounded-md outline-none bg-zinc-600 text-[.8rem]'
              placeholder="Username"
            />
          </div>
          <div className="w-[90%] ">
            <input
              name='nama_pengguna'
              value={values.nama_pengguna}
              onChange={handleInputChange}
              type="text"
              className='w-full p-3 rounded-md outline-none bg-zinc-600 text-[.8rem]'
              placeholder="Nama pengguna"
            />
          </div>
          <div className="w-[90%] ">
            <input
              name='email'
              value={values.email}
              onChange={handleInputChange}
              type="email"
              className='w-full p-3 rounded-md outline-none bg-zinc-600 text-[.8rem]'
              placeholder="Email"
            />
          </div>
          <div className="w-[90%] h-max bg-zinc-600 rounded-md flex justify-around items-center py-3">
            <input
              name='password'
              value={values.password}
              onChange={handleInputChange}

              type={typePassword}
              className='w-[80%]  outline-none  text-[.8rem] rounded-md bg-transparent'
              placeholder="Password"
            />
            {typePassword == 'password' ? (
              <FaEyeSlash className='text-[1.2rem] cursor-pointer text-zinc-400' onClick={togglePasswordVisibility} />
            ) : (
              <IoEyeSharp className='text-[1.2rem] cursor-pointer text-sky-400' onClick={togglePasswordVisibility} />
            )}
          </div>
          <div className="w-[90%]">
            {values.username && values.password && values.nama_pengguna && values.email ? (
              <Button fullWidth size="md" radius='md' type='submit' disabled={isLoading}>
                {isLoading ? (
                  <Loader color="green" type="dots" />
                ) : 'Buat Akun'}
              </Button>
            ) : (
              <Button className='button' disabled fullWidth size="md" radius='md'>
                Buat Akun
              </Button>

            )}
          </div>
        </form>
      </div>
      <div className="w-full h-max text-center flex justify-center items-center text-[.7rem] gap-1">
        <p className='text-zinc-400'>Sudah punya akun?</p>
        <p className='cursor-pointer hover:text-sky-500' onClick={() => navigate('/')}>Masuk</p>
      </div>
    </div>
  )
}