import { Flex, Accordion } from "@mantine/core";
import AppShell from "../../components/layout/app-shell";
import { createCookies, getUserIdByCookies } from "../../store/utils";
import { getPostinganById, getUser } from "../../services/useApi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";

export default function Likes() {
  const [dataSuka, setDataSuka] = useState([])
  const [dataPengikut, setDataPengikut] = useState([])

  const user_id = getUserIdByCookies()
  const navigate = useNavigate()

  const handleNavigate = (nama_pengguna) => {
    createCookies('prevLink2', '/likes-me')
    navigate(`/detail-profile/${nama_pengguna}`)
  };


  const getLoves = async () => {
    const postinganResponse = await getPostinganById(user_id);
    const userResponse = await getUser();
    if (postinganResponse.status && userResponse.status) {
      const postinganData = postinganResponse.data;
      const usersData = userResponse.data;

      const processedData = postinganData.map((postingan) => {
        const result = [];
        postingan.data.love.map((loveId) => {
          if (loveId !== user_id) {
            const filteredUser = usersData.filter(user => user.id === loveId);
            const processedItem = {
              nama_pengguna: filteredUser[0].data.nama_pengguna,
              img_profil: filteredUser[0].data.img_profil,
              img_url: postingan.data.img_url
            };
            result.unshift(processedItem);
          }
        });

        return result;
      });

      const combinedArray = processedData.flat();
      setDataSuka(combinedArray);
    }
  }

  const getUserPengikut = async () => {
    const resUser = await getUser()
    if (resUser.status) {
      const { data } = resUser
      const filterData = data.filter(item => item.data.mengikuti.includes(user_id))
      setDataPengikut(filterData)
    }

  }


  useEffect(() => {
    getLoves()
    getUserPengikut()
  }, [])

  const SukaPostinganCard = () => {
    return (
      dataSuka.length > 0 ? (
        dataSuka.map((item, i) => (
          <Flex className="w-full mb-4" justify={'space-between'} align={'center'} key={i}>
            <Flex className=" w-[80%]" align={'center'}>
              <div className="w-[25%] cursor-pointer" onClick={() => handleNavigate(item.nama_pengguna)}>
                <img src={item.img_profil} alt="profil" className="w-[50px] h-[50px] rounded-full object-cover" loading="lazy" />
              </div>
              <div className="w-[70%] h-max">
                <p className="text-[.7rem]"><span className="font-semibold">{item.nama_pengguna} </span>menyukai postingan anda</p>

              </div>
            </Flex>
            <div className="w-max">
              <img src={item.img_url} alt="profil" className="w-[50px] h-[50px] rounded-md object-cover" loading="lazy" />
            </div>
          </Flex>
        ))
      ) : (
        <p className="text-center text-[.8rem]">Belum ada yang menyukai postingan anda</p>
      )
    )
  }

  const PengikutUserCard = () => {
    return (
      dataPengikut.length > 0 ? (
        dataPengikut.map((item, i) => (
          <Flex className="w-full mb-4" justify={'space-between'} align={'center'} key={i}>
            <Flex className=" w-full" align={'center'}>
              <div className="w-[20%] cursor-pointer " onClick={() => handleNavigate(item.data.nama_pengguna)}>
                <img src={item.data.img_profil} alt="profil" className="w-[50px] h-[50px] rounded-full object-cover" loading="lazy" />
              </div>
              <div className="w-[80%] h-max ">
                <p className="text-[.8rem]"><span className="font-semibold">{item.data.nama_pengguna} </span>mulai mengikuti anda</p>
              </div>
            </Flex>
          </Flex>
        ))
      ) : (
        <p className="text-center text-[.8rem]">Belum ada yang mengikuti anda</p>
      )
    )
  }

  return (
    <AppShell>
      <div className="min-w-full max-w-max h-max flex flex-col gap-2 items-center py-4">
        <div className="w-[90%]">
          <p className="text-[1rem]">Notifikasi</p>
        </div>
        <div className="w-[90%] h-max  mt-2">
          <Accordion variant="" defaultValue="suka" chevron={<IoIosArrowDown size={20} fill="white" />} className=" p-0 bg-zinc-800">
            <Accordion.Item key='suka' value='suka' className="">
              <Accordion.Control >
                <p className="text-white text-[.9rem]">Suka</p>
              </Accordion.Control>
              <Accordion.Panel className="text-white bg-zinc-800 w-full p-0  min-h-max max-h-[350px] overflow-y-scroll">
                <SukaPostinganCard />
              </Accordion.Panel>
            </Accordion.Item>
            <Accordion.Item key='pengikut' value='pengikut' className="">
              <Accordion.Control >
                <p className="text-white text-[.9rem]">Pengikut baru</p>
              </Accordion.Control>
              <Accordion.Panel className="text-white bg-zinc-800 w-full p-0 min-h-max max-h-[350px] overflow-y-scroll">
                <PengikutUserCard />
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>
    </AppShell >

  )
}
