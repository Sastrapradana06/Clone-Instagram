import NavLink from "../../components/ui/nav-link";
import { Flex, Button, Loader } from "@mantine/core";
import { useEffect, useRef, useState } from 'react';
import { getCookies } from "../../store/utils";
import { uploadPostingan } from "../../store/db";
import { posting } from "../../store/api";
import useAppStore from "../../store/store";
import { useShallow } from "zustand/react/shallow";
import { useNavigate, useParams } from "react-router-dom";
import Notification from "../../components/ui/notification";
import { FiUploadCloud } from "react-icons/fi";

export default function CreatePostingan() {
  const [getUserPostingan, userPostingan] = useAppStore(
    useShallow((state) => [state.getUserPostingan, state.userPostingan])
  )
  const [urlImgStatus, setUrlImgStatus] = useState('')
  const [dataEdit, setDataEdit] = useState('')
  const [deskripsi, setDeskripsi] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const [status, setStatus] = useState(false)
  const [title, setTitle] = useState(false)

  const handleNotif = (status, title) => {
    setStatus(status)
    setTitle(title)
  }

  const { id } = useParams()

  const [fileImg, setFileImg] = useState('')
  const fileInputRef = useRef(null);
  const dataByCookies = getCookies('user_data')
  const userData = JSON.parse(dataByCookies)
  const navigate = useNavigate()

  useEffect(() => {
    if (id) {
      editPostingan()
    }
  }, [id])

  const editPostingan = () => {
    const filterPostingan = userPostingan.filter((data) => {
      return data.id == id
    })
    if (filterPostingan.length > 0) {
      const { data } = filterPostingan[0]
      setUrlImgStatus(data.img_url)
      setDeskripsi(data.deskripsi)
      setDataEdit(data)
    }
  }

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    const urlBlob = URL.createObjectURL(file);
    setFileImg(file)
    setUrlImgStatus(urlBlob)
  }

  const handleForm = async (event) => {
    event.preventDefault();
    setIsLoading(true)
    let data

    if (!id) {
      const result = await uploadPostingan(fileImg, userData.data.nama_pengguna)

      data = {
        id: undefined,
        user_id: userData.id,
        nama_pengguna: userData.data.nama_pengguna,
        deskripsi: deskripsi,
        img_url: result,
        img_profil: userData.data.img_profil,
        love: []
      }
    } else {
      data = {
        id,
        user_id: dataEdit.user_id,
        nama_pengguna: dataEdit.nama_pengguna,
        deskripsi: deskripsi,
        img_url: dataEdit.img_url,
        img_profil: dataEdit.img_profil,
        love: dataEdit.love
      }
    }

    const res = await posting(data)
    if (res.status) {
      handleNotif('success', 'Berhasil Membuat Postingan')
      getUserPostingan()
      setDeskripsi('')
      setUrlImgStatus('')
      if (id) {
        navigate(`/profile/detail-postingan/${id}`)
      } else {
        navigate('/profile')
      }
    } else {
      handleNotif('error', 'Gagal membuat postingan')
    }
    setIsLoading(false)
  }


  return (
    <div className="w-full min-h-[100vh] max-h-max bg-zinc-800 text-white flex items-center flex-col">
      <Notification status={status} title={title} />
      <NavLink title={'Buat Postingan'} url={'/home'} />
      <div className="w-[90%] h-max pt-20 pb-5">
        <p className="text-[.9rem] font-medium">Upload image</p>
        {urlImgStatus ? (
          <Flex className="w-full h-max  text-white mt-2" direction={'column'} align={'center'} gap={'sm'}>
            <img src={urlImgStatus} alt="user" className="w-full h-[400px]  border border-dashed border-gray-500 object-cover" loading="lazy" />
            {!id && (
              <Button variant="light" color="indigo" disabled={isLoading} onClick={handleClick}>{urlImgStatus ? 'Ganti Foto' : 'Upload foto'}</Button>
            )}
          </Flex>
        ) : (
          <Flex className="w-full h-[200px] border border-dashed border-gray-500 mt-2" justify={'center'} align={'center'} direction={'column'}>
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
        <form className="w-full h-max flex gap-4 flex-col mt-4" onSubmit={handleForm}>
          <Flex className="w-full h-max" direction={'column'}>
            <label htmlFor="deskripsi" className="text-[.9rem] font-medium">Tulis Status</label>
            <textarea className="w-full bg-transparent border border-zinc-400 rounded-md outline-none h-[200px] p-2 mt-2" name="deskripsi" value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} />
          </Flex>

          <div className="w-full">
            <Button variant="light" color="green" type="submit">
              {isLoading ? (
                <Loader color="green" type="dots" />
              ) : id ? 'Edit' : 'Posting'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}