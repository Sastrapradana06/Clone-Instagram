import { Flex } from "@mantine/core";
import AppShell from "../../../components/layout/app-shell";
import NavLink from "../../../components/ui/nav-link";
import { TiUserAdd } from "react-icons/ti";
import { TbBoxPadding } from "react-icons/tb";
import { useEffect, useState } from "react";
import { getPostinganById, getStatusById, getUserByNamaPengguna, handleIkutiUser } from "../../../store/api";
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { createCookies, formatPengikut, getCookies, getUserIdByCookies } from "../../../store/utils";
import Loading from "../../../components/ui/loading";
import useAppStore from "../../../store/store";
import { useShallow } from "zustand/react/shallow";
import { FaSpinner } from "react-icons/fa";
import ShowImgProfil from "../../../components/ui/show-img-profil";
import CardStatus from "../../../components/ui/card-status";


export default function ProfileByNamaPengguna() {
  const [dataPengguna, setDataPengguna] = useState({})
  const [postinganPengguna, setPostinganPengguna] = useState([])
  const [statusPengguna, setStatusPengguna] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [show, setShow] = useState(false);
  const [idStatus, setIdStatus] = useState('')



  const [updateUserPostingan, getUser, isShowStatus, setIsShowStatus] = useAppStore(
    useShallow((state) => [state.updateUserPostingan, state.getUser, state.isShowStatus, state.setIsShowStatus])
  )

  const { nama_pengguna } = useParams()
  const navigate = useNavigate()
  const { pathname } = useLocation();
  const user_id = getUserIdByCookies();
  const prevLink2 = getCookies('prevLink2')


  const handleCloseModal = () => {
    setShow(false);
  };

  const showStatus = (id) => {
    setIsShowStatus(true)
    setIdStatus(id)
  }


  const getPengguna = async () => {
    const res = await getUserByNamaPengguna(nama_pengguna)
    if (res.status) {
      setDataPengguna(res.data[0])
      await getPostingan(res.data[0].id)
      await getStatus(res.data[0].id)
    } else {
      setDataPengguna([])
      navigate('/search')
    }
  }

  const getStatus = async (id) => {
    const res = await getStatusById(id)
    if (res.status) {
      setStatusPengguna(res.data)
    }
  }

  const getPostingan = async (id) => {
    const res = await getPostinganById(id)
    if (res.status) {
      setPostinganPengguna(res.data)
      updateUserPostingan(res.data)
    }
  }

  useEffect(() => {
    if (nama_pengguna) {
      getPengguna()
      createCookies('prevLink', pathname)
    } else {
      navigate('/search')
    }
  }, [nama_pengguna])

  const ikutiPengguna = async (id_pengguna) => {
    setIsLoading(true)
    const data = {
      id_pengguna,
      id_user: user_id
    }

    if (Object.keys(data).length > 0) {
      const res = await handleIkutiUser(data)
      if (res.status) {
        setDataPengguna(prev => ({
          ...prev,
          data: {
            ...prev.data,
            pengikut: res.data.pengikut
          }
        }))
        getUser()
      }
    }
    setIsLoading(false)
  }

  return (
    <AppShell>
      {show && Object.keys(dataPengguna).length > 0 && (
        <ShowImgProfil url={dataPengguna?.data.img_profil} handleCloseModal={handleCloseModal} />
      )}

      {isShowStatus && (
        <div className="w-full h-[100vh] fixed left-0 top-0 bg-zinc-800 z-50">
          <CardStatus
            data={statusPengguna}
            id={idStatus}
          />
        </div>
      )}

      {Object.keys(dataPengguna).length > 0 ? (
        <div className="w-full h-max">
          <NavLink title={dataPengguna?.data.nama_pengguna} url={prevLink2} />
          <div className="w-full h-max m-auto mt-[70px]">
            <Flex className="w-[90%] h-max m-auto" justify={'space-between'} gap={'md'} align={'center'}>
              <div className="w-max h-max">
                <img src={dataPengguna?.data.img_profil} alt="icon" className="w-[70px] h-[70px] object-cover rounded-full cursor-pointer" loading="lazy" onClick={() => setShow(true)} />
              </div>
              <Flex className=" w-[70%] h-max" justify={'space-between'}>
                <div className="text-center text-[.8rem]">
                  <p className="font-semibold text-[1rem]">{postinganPengguna.length}</p>
                  <p>postingan</p>
                </div>
                <div className="text-center text-[.8rem]">
                  <p className="font-semibold text-[1rem]">{formatPengikut(dataPengguna.data.pengikut.length)}</p>
                  <p>pengikut</p>
                </div>
                <div className="text-center text-[.8rem]">
                  <p className="font-semibold text-[1rem]">{formatPengikut(dataPengguna.data.mengikuti.length)}</p>
                  <p>mengikuti</p>
                </div>
              </Flex>
            </Flex>
            <div className="w-[90%] h-max text-[.9rem] m-auto">
              <p className='capitalize' style={{ fontFamily: 'Poppins', fontWeight: 700 }}>{dataPengguna?.data.username}</p>
              <p className='-mt-1 capitalize' style={{ fontFamily: 'Poppins', fontWeight: 400 }}>{dataPengguna?.data.bio}</p>
              <a href={dataPengguna.data.tautan} className='text-sky-300 text-[.8rem]' style={{ fontFamily: 'Poppins', fontWeight: 400 }}>{dataPengguna.data.tautan}</a>
            </div>
            <Flex className="w-[90%] m-auto h-max mt-2" justify={'space-between'} align={'center'}>
              {isLoading ? (
                <button className="w-[40%] py-1 bg-zinc-800 text-[.8rem] rounded-lg hover:text-sky-600 flex justify-center items-center">
                  <FaSpinner className="animate-spin text-green-400" size={21} />
                </button>
              ) : (
                dataPengguna.data.pengikut.includes(user_id) ? (
                  <button className="w-[40%] py-1 bg-zinc-300 text-black tracking-[1px] text-[.8rem] rounded-lg hover:bg-zinc-400  font-semibold flex justify-center items-center" onClick={() => ikutiPengguna(dataPengguna.id)}>
                    Mengikuti
                  </button>
                ) : (
                  <button className="w-[40%] py-1 bg-sky-500 text-[.8rem] rounded-lg hover:bg-sky-600  font-semibold flex justify-center items-center tracking-[1px]" onClick={() => ikutiPengguna(dataPengguna.id)}>
                    Ikuti
                  </button>
                )
              )}
              <button className="w-[40%] py-1 bg-zinc-800 text-[.8rem] rounded-lg hover:text-sky-600">Kirim Pesan</button>
              <button className="w-[15%] py-1 bg-zinc-800 text-[.8rem] rounded-lg flex justify-center items-center">
                <TiUserAdd size={20} fill="white" />
              </button>
            </Flex>
            <div className="flex overflow-x-scroll  mt-4 w-[90%] m-auto h-max gap-2">
              {statusPengguna.length > 0 && (
                statusPengguna.map((item) => (
                  <div className="inline-block w-max h-max  flex-none text-center cursor-pointer" key={item.id} onClick={() => showStatus(item.id)}>
                    <img src={item.data.img_status} alt="img_profil" className="object-cover w-[65px] h-[65px] border-2 border-zinc-800 rounded-full  p-1 m-auto" loading="lazy" />
                  </div>
                ))
              )}
            </div>
            <div className="w-full h-max mt-2 mb-[60px]">
              <Flex className="w-[90%] m-auto h-[50px] border-b" justify={'center'} align={'center'}>
                <TbBoxPadding size={35} />
              </Flex>
              <Flex className="w-full h-max mt-1 gap-[1.5px]" wrap={'wrap'} justify={''}>
                {postinganPengguna.length > 0 ? (
                  postinganPengguna.map((item) => {
                    return (
                      <div className="w-[33%] h-[150px] mt-1 cursor-pointer" key={item.id} onClick={() => navigate(`/profile/detail-postingan/${item.id}`)}>
                        <img src={item.data.img_url} alt="status" className="w-full h-full object-cover" loading="lazy" />
                      </div>
                    )
                  })
                ) : null}
              </Flex>
            </div>
          </div>
        </div>
      ) : <Loading />}

    </AppShell>
  )
}

