import { Flex } from "@mantine/core";
import AppShell from "../../../components/layout/app-shell";
import NavLink from "../../../components/ui/nav-link";
import { useParams } from "react-router-dom";
import ButtonLink from "../../../components/ui/button-link";
import { TiUserAdd } from "react-icons/ti";
import { TbBoxPadding } from "react-icons/tb";
import { useEffect, useState } from "react";
import { getUserByNamaPengguna } from "../../../store/api";
import { useNavigate } from 'react-router-dom';
import { formatPengikut } from "../../../store/utils";



export default function ProfileByNamaPengguna() {
  const [dataPengguna, setDataPengguna] = useState({})

  const { nama_pengguna } = useParams()
  const navigate = useNavigate()


  const getUser = async () => {
    const res = await getUserByNamaPengguna(nama_pengguna)
    if (res.status) {
      setDataPengguna(res.data[0])
    } else {
      setDataPengguna([])
      navigate('/search')
    }
  }

  useEffect(() => {
    if (nama_pengguna) {
      getUser()
    } else {
      navigate('/search')
    }

  }, [nama_pengguna])

  return (
    <AppShell>
      {Object.keys(dataPengguna).length > 0 ? (
        <div className="w-full h-max">
          <NavLink title={dataPengguna?.data.nama_pengguna} url={'/search'} />
          <div className="w-[90%] h-max m-auto mt-[70px]">
            <Flex className="w-full h-max m-auto" justify={'space-between'} gap={'md'} align={'center'}>
              <div className="w-max h-max">
                <img src={dataPengguna?.data.img_profil} alt="icon" className="w-[70px] h-[70px] object-cover rounded-full" />
              </div>
              <Flex className=" w-[70%] h-max" justify={'space-between'}>
                <div className="text-center text-[.8rem]">
                  <p className="font-semibold text-[1rem]">4</p>
                  <p>postingan</p>
                </div>
                <div className="text-center text-[.8rem]">
                  <p className="font-semibold text-[1rem]">{formatPengikut(dataPengguna.data.pengikut)}</p>
                  <p>pengikut</p>
                </div>
                <div className="text-center text-[.8rem]">
                  <p className="font-semibold text-[1rem]">{dataPengguna?.data.mengikuti}</p>
                  <p>mengikuti</p>
                </div>
              </Flex>
            </Flex>
            <div className="w-max h-max text-[.9rem] ">
              <p className='capitalize' style={{ fontFamily: 'Poppins', fontWeight: 700 }}>{dataPengguna?.data.username}</p>
              <p className='-mt-1 capitalize' style={{ fontFamily: 'Poppins', fontWeight: 400 }}>{dataPengguna?.data.bio}</p>
              <a href={dataPengguna.data.tautan} className='text-sky-300 text-[.8rem]' style={{ fontFamily: 'Poppins', fontWeight: 400 }}>{dataPengguna.data.tautan}</a>
            </div>
            <Flex className="w-full h-max mt-2" justify={'space-between'} align={'center'}>
              <button className="w-[40%] py-1 bg-sky-500 text-[.8rem] rounded-lg hover:bg-sky-600  font-semibold">Ikuti</button>
              <ButtonLink style='w-[40%] py-1 bg-zinc-800 text-[.8rem] rounded-lg hover:text-sky-600' url='/profile/bagikan-profile' title='Bagikan Profil' />
              <button className="w-[15%] py-1 bg-zinc-800 text-[.8rem] rounded-lg flex justify-center items-center">
                <TiUserAdd size={20} fill="white" />
              </button>
            </Flex>
            <div className="inline-block w-max h-max  flex-none text-center cursor-pointer mt-4">
              <img src={'/icon.jfif'} alt="cantik" className="object-cover w-[65px] h-[65px] border-2 border-zinc-800 rounded-full  p-1 m-auto" />
              <p className='text-[.7rem] mt-1'>Luvv</p>
            </div>
            <div className="w-full h-max mt-2 mb-[60px]">
              <Flex className="w-[90%] m-auto h-[50px] border-b" justify={'center'} align={'center'}>
                <TbBoxPadding size={35} />
              </Flex>
              <Flex className="w-full h-max mt-1 gap-[1.5px]" wrap={'wrap'} justify={''}>
                <div className="w-[33%] h-[150px] mt-1 cursor-pointer" >
                  <img src={'/icon.jfif'} alt="status" className="w-full h-full object-cover" />
                </div>

              </Flex>
            </div>
          </div>
        </div>
      ) : <p className="text-center">Loading..</p>}

    </AppShell>
  )
}