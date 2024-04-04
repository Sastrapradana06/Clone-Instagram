import NavLink from "../../components/ui/nav-link";
import { Flex, Button, Loader } from "@mantine/core";
import { useEffect, useRef, useState } from 'react';
import { getCookies, handleToast } from "../../store/utils";
import { uploadPostingan } from "../../store/db";
import { posting } from "../../store/api";
import { ToastContainer } from 'react-toastify';
import useAppStore from "../../store/store";
import { useShallow } from "zustand/react/shallow";
import { useNavigate, useParams } from "react-router-dom";


export default function CreatePostingan() {
  const [getUserPostingan, userPostingan] = useAppStore(
    useShallow((state) => [state.getUserPostingan, state.userPostingan])
  )
  const [urlImgStatus, setUrlImgStatus] = useState('')
  const [dataEdit, setDataEdit] = useState('')
  const [deskripsi, setDeskripsi] = useState('')
  const [isLoading, setIsLoading] = useState(false)

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
    const filterPostingan = userPostingan?.filter((data) => {
      return data.id == id
    })

    if (filterPostingan) {
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
      handleToast(res.message, 'success')
      getUserPostingan()
      setDeskripsi('')
      setUrlImgStatus('')
      if (id) {
        navigate(`/profile/detail-postingan/${id}`)
      } else {
        navigate('/profile')
      }
    } else {
      handleToast(res.message, 'warning')
    }
    setIsLoading(false)
  }


  return (
    <div className="w-full min-h-[100vh] max-h-max bg-zinc-800 text-white flex justify-center items-center flex-col">
      <ToastContainer />
      <NavLink title={'Buat Postingan'} url={'/home'} />
      <Flex className="w-full h-max m-auto pt-20 pb-5" direction={'column'} gap={'md'} align={'center'}>
        <Flex className="w-full h-max  text-white" direction={'column'} align={'center'} gap={'sm'}>
          {urlImgStatus ? (
            <img src={urlImgStatus} alt="user" className="w-[90%] h-[400px]  border object-cover" />
          ) : null}
          {!id && (
            <Button variant="light" color="green" onClick={handleClick}>{urlImgStatus ? 'Ganti Foto' : 'Upload foto'}</Button>
          )}
          <input
            type="file"
            id="file-input"
            className="file-input hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
        </Flex>

        <form className="w-[90%] h-max flex gap-4 flex-col" onSubmit={handleForm}>
          <Flex className="w-full h-max" direction={'column'}>
            <label htmlFor="deskripsi" className="text-[.8rem] text-zinc-400">Deskripsi Status</label>
            <textarea className="w-full bg-transparent border-b outline-none h-[100px]" name="deskripsi" value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} />
          </Flex>

          <div className="w-full">
            <Button variant="light" color="indigo" type="submit">
              {isLoading ? (
                <Loader color="green" type="dots" />
              ) : id ? 'Edit' : 'Posting'}
            </Button>
          </div>
        </form>
      </Flex>
    </div>
  )
}