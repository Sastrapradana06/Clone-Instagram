import { Button, Flex, Loader } from "@mantine/core";
import { useEffect, useRef, useState } from 'react';
import NavLink from "../../../components/ui/nav-link";
import { useShallow } from 'zustand/react/shallow'
import useAppStore from "../../../store/store";
import { ToastContainer } from 'react-toastify';
import { getCookies, handleToast } from "../../../store/utils";
import { editUserProfil } from "../../../store/api";

export default function EditProfile() {
  const [dataUser, updateDataUser, getUser] = useAppStore(
    useShallow((state) => [state.dataUser, state.updateDataUser, state.getUser])
  )
  const [data, setData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false)
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (dataUser == undefined) {
      getUser()
    } else {
      setData(dataUser)
    }

  }, [dataUser])




  const handleInput = (e) => {
    const { name, value } = e.target
    setData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = URL.createObjectURL(e.target.files[0]);
    console.log({ file });
  }

  const updateProfil = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    const dataByCookies = getCookies('user_data')
    const userData = JSON.parse(dataByCookies)

    const newDataUser = {
      id: userData.id,
      newData: {
        pengikut: userData.pengikut,
        mengikuti: userData.mengikuti,
        email: userData.email,
        password: userData.password,
        ...data
      }
    }

    const res = await editUserProfil(newDataUser)
    if (res.status) {
      handleToast("Profil berhasil di edit", 'success')
      updateDataUser(res.data)
    } else {
      handleToast(res.message, 'warning')
    }

    setIsLoading(false)
  }

  return (
    <div className="w-full min-h-[100vh] max-h-max bg-zinc-800 text-white">
      <ToastContainer />
      <NavLink title={'Edit Profil'} url={'/profile'} />
      {dataUser && (
        <Flex className="w-[90%] h-max m-auto pt-20" direction={'column'} gap={'xs'} align={'center'}>
          <Flex className="w-max h-max  text-white" direction={'column'} align={'center'} gap={'sm'}>
            <img src={dataUser.imgProfil} alt="user" className="w-[70px] h-[70px] rounded-full border" />
            <button className="text-sky-500 text-[.9rem] font-semibold" onClick={handleClick}>Edit foto</button>
            <input
              type="file"
              id="file-input"
              className="file-input hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </Flex>

          <form className="w-full h-max flex gap-4 flex-col" onSubmit={updateProfil}>
            <Flex className="w-full h-max" direction={'column'}>
              <label htmlFor="username" className="text-[.8rem] text-zinc-400">Username</label>
              <input type="text" className="w-full bg-transparent border-b outline-none" name="username" onChange={handleInput} value={data?.username} />
            </Flex>
            <Flex className="w-full h-max" direction={'column'}>
              <label htmlFor="nama_pengguna" className="text-[.8rem] text-zinc-400">Nama Pengguna</label>
              <input type="text" className="w-full bg-transparent border-b outline-none" name="nama_pengguna" onChange={handleInput} value={data?.nama_pengguna} />
            </Flex>
            <Flex className="w-full h-max" direction={'column'}>
              <label htmlFor="bio" className="text-[.8rem] text-zinc-400">Bio</label>
              <input type="text" className="w-full bg-transparent border-b outline-none" name="bio" onChange={handleInput} value={data?.bio} />
            </Flex>
            <Flex className="w-full h-max" direction={'column'}>
              <label htmlFor="tautan" className="text-[.8rem] text-zinc-400">Tautan</label>
              <input type="text" className="w-full bg-transparent border-b outline-none text-sky-500" name="tautan" onChange={handleInput} value={data?.tautan} />
            </Flex>
            <div className="w-full">
              <Button size="sm" radius='md' type='submit' disabled={isLoading}>
                {isLoading ? (
                  <Loader color="green" type="dots" />
                ) : 'Ubah'}
              </Button>
            </div>
          </form>
        </Flex>
      )}
    </div>
  )
}