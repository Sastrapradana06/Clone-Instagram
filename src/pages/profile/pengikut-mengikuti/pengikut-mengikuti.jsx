import NavLink from "../../../components/ui/nav-link";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { getUser } from "../../../store/api";
import { useEffect, useState } from "react";
import { Flex } from '@mantine/core';
import { createCookies, formatPengikut } from "../../../store/utils";
import Loading from "../../../components/ui/loading";



export default function DaftarPengikutMengikuti() {
  const [isLoading, setIsLoading] = useState(false)

  const [data, setData] = useState([])
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { id } = useParams()


  const getPengikutUser = async () => {
    setIsLoading(true)
    const res = await getUser()
    if (res.status) {
      const filterPengikut = res.data.filter(item => item.data.mengikuti.includes(id))
      filterPengikut.sort((a, b) => a.data.nama_pengguna.localeCompare(b.data.nama_pengguna))
      setData(filterPengikut)
    }
    setIsLoading(false)
  }

  const getMengikutiUser = async () => {
    setIsLoading(true)
    const res = await getUser()
    if (res.status) {
      const filterMengikuti = res.data.filter(item => item.data.pengikut.includes(id))
      filterMengikuti.sort((a, b) => a.data.nama_pengguna.localeCompare(b.data.nama_pengguna))
      setData(filterMengikuti.sort())
    }
    setIsLoading(false)
  }

  const handleNavigate = (nama_pengguna) => {
    createCookies('prevLink2', pathname)
    navigate(`/search/${nama_pengguna}`)
  };

  useEffect(() => {
    if (pathname.includes('pengikut')) {
      getPengikutUser()
    } else {
      getMengikutiUser()
    }
  }, [])

  return (
    <div className="w-full min-h-[100vh] max-h-max bg-zinc-800 text-white">
      <NavLink title={pathname.includes('pengikut') ? 'Daftar Pengikut' : 'Daftar Mengikuti'} url={'/profile'} />
      {isLoading && <Loading />}
      <div className="w-full h-max pt-[65px] px-6 pb-5">
        <div className="w-full h-max">
          {data.length > 0 ? (
            data.map((item) => (
              <Flex className='w-full h-max cursor-pointer p-2 bg-zinc-600 rounded-md mb-2 hover:bg-zinc-700' align={'center'} gap={'sm'} key={item.data.nama_pengguna} onClick={() => handleNavigate(item.data.nama_pengguna)}>
                <img src={item.data.img_profil} alt="img_profil" className='w-[40px] h-[40px] border-2 border-sky-500 object-cover rounded-full' loading='lazy' />
                <p className='text-[.8rem]' style={{ fontFamily: 'Poppins' }}>{item.data.nama_pengguna}</p>
              </Flex>
            ))
          ) : (
            <p className="text-center text-[.9rem] text-zinc-400">{pathname.includes('pengikut') ? 'Belum ada yang mengikuti anda' : 'Anda belum mengikuti siapa pun'}</p>
          )}
        </div>
        <div className="w-full h-max mt-4">
          <p className="text-[.8rem] text-zinc-400">Total <span className="text-sky-500 font-semibold text-[.9rem] ml-1">{formatPengikut(data.length)}</span></p>
        </div>
      </div>
    </div>
  )
}