import NavLink from "../../components/ui/nav-link";
import { Flex, Button, Loader } from "@mantine/core";
import { useRef, useState } from 'react';
import { getCookies } from "../../store/utils";
import { uploadImgStatus } from "../../store/db";
import { createStatus } from "../../store/api";
import useAppStore from "../../store/store";
import { useShallow } from "zustand/react/shallow";
import { useNavigate } from "react-router-dom";
import Notification from "../../components/ui/notification";
import { FiUploadCloud } from "react-icons/fi";

export default function CreateStatus() {
  const [getUserStatus] = useAppStore(
    useShallow((state) => [state.getUserStatus])
  )
  const [urlImgStatus, setUrlImgStatus] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const [status, setStatus] = useState(false)
  const [title, setTitle] = useState(false)

  const handleNotif = (status, title) => {
    setStatus(status)
    setTitle(title)
  }

  const [fileImg, setFileImg] = useState('')
  const fileInputRef = useRef(null);
  const dataByCookies = getCookies('user_data')
  const userData = JSON.parse(dataByCookies)
  const navigate = useNavigate()



  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    const urlBlob = URL.createObjectURL(file);
    setFileImg(file)
    setUrlImgStatus(urlBlob)
  }

  const handleForm = async () => {
    setIsLoading(true)

    const result = await uploadImgStatus(fileImg, userData.data.nama_pengguna)

    if (result) {
      const data = {
        user_id: userData.id,
        nama_pengguna: userData.data.nama_pengguna,
        img_profil: userData.data.img_profil,
        img_status: result,
      }

      const res = await createStatus(data)
      if (res.status) {
        handleNotif('success', 'Berhasil Membuat Status')
        setUrlImgStatus('')
        getUserStatus()
        navigate('/profile')
      } else {
        handleNotif('error', 'Gagal membuat postingan')
      }
    }

    setIsLoading(false)
  }


  return (
    <div className="w-full min-h-[100vh] max-h-max bg-zinc-800 text-white flex items-center flex-col">
      <Notification status={status} title={title} />
      <NavLink title={'Buat Status'} url={'/profile'} />
      <div className="w-[90%] h-max pt-20 pb-5">
        <p className="text-[.9rem] font-medium">Upload image</p>
        {urlImgStatus ? (
          <Flex className="w-full h-max  text-white mt-2" direction={'column'} align={'center'} gap={'sm'}>
            <img src={urlImgStatus} alt="user" className="w-full h-[550px]  border border-dashed border-gray-500 object-cover" loading="lazy" />
            <Button variant="light" color="indigo" disabled={isLoading} onClick={handleClick}>{urlImgStatus ? 'Ganti Foto' : 'Upload foto'}</Button>
          </Flex>
        ) : (
          <Flex className="w-full h-[500px] border border-dashed border-gray-500 mt-2" justify={'center'} align={'center'} direction={'column'}>
            <FiUploadCloud size={30} className="text-sky-300 cursor-pointer" disabled={isLoading} onClick={handleClick} />
            <p className="text-[.8rem] text-slate-300" >Pilih file untuk upload</p>
          </Flex>
        )}
        <input
          type="file"
          id="file-input"
          className="file-input hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
        />

        <div className="w-full mt-4">
          <Button variant="light" color="green" onClick={handleForm} disabled={urlImgStatus == ''}>
            {isLoading ? (
              <Loader color="green" type="dots" />
            ) : 'Posting Status'}
          </Button>
        </div>
      </div>
    </div>
  )
}