import { useState } from 'react';
import { FaEyeSlash } from "react-icons/fa6";
import { IoEyeSharp } from "react-icons/io5";
import { Button, Loader } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleToast } from '../../store/utils';
import { registerAkun } from '../../store/api';



export default function Sign() {
  const [isLoading, setIsLoading] = useState(false)
  const [typePassword, setTypePassword] = useState('password')
  const [data, setData] = useState({
    username: '',
    nama_pengguna: '',
    email: '',
    password: ''
  })

  const clearInput = () => {
    const clearData = {
      username: '',
      nama_pengguna: '',
      email: '',
      password: ''
    }
    setData(clearData)
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    const res = await registerAkun(data)
    if (res.status) {
      handleToast('Berhasil Membuat Akun', 'success')
      navigate('/')
      clearInput()
    } else {
      handleToast(res.message, 'warning')
    }
    setIsLoading(false)

  }



  return (
    <div className="w-full min-h-[100vh] max-h-max bg-zinc-900 flex flex-col justify-center items-center gap-6 text-white" style={{ fontFamily: 'Montserrat', fontWeight: 400 }}>
      <ToastContainer />
      <div className="w-[90%] h-max  flex flex-col items-center gap-6">
        <div className="text-center">
          <h1 style={{ fontFamily: 'Satisfy', fontWeight: 400 }} className="text-[2rem]">Snapvibes</h1>
        </div>
        <form onSubmit={handleSubmit} className="w-full  flex flex-col gap-4 items-center h-max ">
          <div className="w-[90%] ">
            <input
              name='username'
              value={data.username}
              onChange={handleInput}
              type="text"
              className='w-full p-3 rounded-md outline-none bg-zinc-600 text-[.8rem]'
              placeholder="Username"
            />
          </div>
          <div className="w-[90%] ">
            <input
              name='nama_pengguna'
              value={data.nama_pengguna}
              onChange={handleInput}
              type="text"
              className='w-full p-3 rounded-md outline-none bg-zinc-600 text-[.8rem]'
              placeholder="Nama pengguna"
            />
          </div>
          <div className="w-[90%] ">
            <input
              name='email'
              value={data.email}
              onChange={handleInput}
              type="email"
              className='w-full p-3 rounded-md outline-none bg-zinc-600 text-[.8rem]'
              placeholder="Email"
            />
          </div>
          <div className="w-[90%] h-max bg-zinc-600 rounded-md flex justify-around items-center py-3">
            <input
              name='password'
              value={data.password}
              onChange={handleInput}

              type={typePassword}
              className='w-[80%]  outline-none  text-[.8rem] rounded-md bg-transparent'
              placeholder="Password"
            />
            {typePassword == 'password' ? (
              <FaEyeSlash className='text-[1.2rem] cursor-pointer text-zinc-400' onClick={handleTypePassword} />
            ) : (
              <IoEyeSharp className='text-[1.2rem] cursor-pointer text-sky-400' onClick={handleTypePassword} />
            )}
          </div>
          <div className="w-[90%]">
            {data.username && data.password ? (
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