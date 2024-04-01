import { Flex } from '@mantine/core';
import { TiUserAdd } from "react-icons/ti";
import { Button } from '@mantine/core';
import { FaPlus } from "react-icons/fa6";
import ButtonLink from '../../components/ui/button-link';
import { useShallow } from 'zustand/react/shallow'
import useAppStore from '../../store/store';
import { useState } from 'react';
import CardStatus from '../../components/ui/card-status';
import { formatPengikut } from '../../store/utils';



export default function UserProfile() {
  const [isShowStatus, setIsShowStatus, dataUser,] = useAppStore(
    useShallow((state) => [state.isShowStatus, state.setIsShowStatus, state.dataUser])
  )

  console.log({ dataUser });


  const [data, setData] = useState()

  const dataStatusUser = [
    {
      id: 1,
      imgUrl: 'https://i.pinimg.com/564x/9b/77/e9/9b77e9bbbb7c76837d67e44a98c01c5d.jpg',
      textStatus: '💙'
    },
    {
      id: 2,
      imgUrl: 'https://i.pinimg.com/564x/ec/d3/6b/ecd36bed10f5e06bdf1ef966031c0e03.jpg',
      textStatus: 'Work'
    },
    {
      id: 3,
      imgUrl: 'https://i.pinimg.com/564x/88/6d/43/886d43c37ff739905f67153caab26e99.jpg',
      textStatus: 'Lorem Ipsum'
    },
  ]

  const findPeople = [
    {
      urlImgProfile: 'https://i.pinimg.com/564x/5b/df/15/5bdf159a0ab947d62e0d7a3a65ce4721.jpg',
      username: 'Presliskin'
    },
    {
      urlImgProfile: 'https://i.pinimg.com/564x/3e/6a/4d/3e6a4d90cd818895a1bc1e3de4c8e709.jpg',
      username: 'silvia_arini'
    },
    {
      urlImgProfile: 'https://i.pinimg.com/564x/f3/92/4f/f3924f08a512da63c2e041969cae8a39.jpg',
      username: 'fia'
    },
  ]

  const showStatus = (item) => {
    const dataUser = {
      nama_pengguna: 'sean_',
      imgProfil: 'https://i.pinimg.com/564x/c0/18/31/c0183163ba468401a02ae53b2665daa1.jpg',
    }
    const newData = { ...dataUser, ...item }
    setData(newData)
    setIsShowStatus(true)
  }

  return (
    <>
      {isShowStatus && (
        <div className="w-full h-[100vh] fixed left-0 top-0 bg-zinc-800 z-50">
          <CardStatus
            imgProfil={data.imgProfil}
            imgStatus={data.imgUrl}
            username={data.nama_pengguna}
            textStatus={data.textStatus}
          />
        </div>
      )}

      <div className="w-[90%] h-max m-auto">
        {dataUser ? (
          <>
            <Flex className="w-full h-max m-auto  mt-4" justify={'space-between'} gap={'md'} align={'center'}>
              <div className="w-max h-max">
                <img src={dataUser.img_profil == "" ? '/icon.jfif' : dataUser.img_profil} alt="icon" className="w-[70px] h-[70px] object-cover rounded-full" />
              </div>
              <Flex className=" w-[70%] h-max" justify={'space-between'}>
                <div className="text-center text-[.8rem]">
                  <p className="font-semibold text-[1rem]">4</p>
                  <p>postingan</p>
                </div>
                <div className="text-center text-[.8rem]">
                  <p className="font-semibold text-[1rem]">{formatPengikut(dataUser.pengikut)}</p>
                  <p>pengikut</p>
                </div>
                <div className="text-center text-[.8rem]">
                  <p className="font-semibold text-[1rem]">{formatPengikut(dataUser.mengikuti)}</p>
                  <p>mengikuti</p>
                </div>
              </Flex>
            </Flex>
            <div className="w-max h-max text-[.9rem] ">
              <p className='capitalize' style={{ fontFamily: 'Poppins', fontWeight: 700 }}>{dataUser.username}</p>
              <p className='-mt-1 capitalize' style={{ fontFamily: 'Poppins', fontWeight: 400 }}>{dataUser.bio}</p>
              <a href={dataUser.tautan} className='text-sky-300 text-[.8rem]' style={{ fontFamily: 'Poppins', fontWeight: 400 }}>{dataUser.tautan}</a>
            </div>
          </>
        ) : null}
        <Flex className="w-full h-max mt-2" justify={'space-between'} align={'center'}>
          <ButtonLink style='w-[40%] py-1 bg-zinc-800 text-[.8rem] rounded-lg hover:text-sky-600' url='/profile/edit-profile' title='Edit Profil' />
          <ButtonLink style='w-[40%] py-1 bg-zinc-800 text-[.8rem] rounded-lg hover:text-sky-600' url='/profile/bagikan-profile' title='Bagikan Profil' />
          <button className="w-[15%] py-1 bg-zinc-800 text-[.8rem] rounded-lg flex justify-center items-center">
            <TiUserAdd size={20} fill="white" />
          </button>
        </Flex>
        <div className="flex overflow-x-scroll  mt-4 w-full h-max gap-2">
          {dataStatusUser ? (
            dataStatusUser.map((item, i) => {
              return (
                <div className="inline-block w-max h-max  flex-none text-center cursor-pointer" key={i} onClick={() => showStatus(item)}>
                  <img src={item.imgUrl} alt="cantik" className="object-cover w-[65px] h-[65px] border-2 border-zinc-800 rounded-full  p-1 m-auto" />
                  <p className='text-[.7rem] mt-1'>{item.textStatus}</p>
                </div>
              )
            })
          ) : null}
          <div className="inline-block w-max h-max  flex-none text-center cursor-pointer">
            <Flex className='w-[63px] h-[63px] border rounded-full' justify={'center'} align={'center'}>
              <FaPlus className=' text-[1.3rem] text-white' />
            </Flex>
            <p className='text-[.8rem] mt-1'>Baru</p>
          </div>
        </div>
        <div className="w-full h-max mt-6 ">
          <p className="text-[.8rem]">Temukan orang</p>
          <div className="flex overflow-x-scroll  mt-1">
            {findPeople ? (
              findPeople.map((item, i) => {
                return (
                  <div className="inline-block w-[150px] h-[200px] border border-zinc-800 rounded-md mr-1 p-1 flex-none" key={i}>
                    <Flex className="w-full h-full m-auto" direction={'column'} justify={'center'} align={'center'} gap={'sm'}>
                      <img src={item.urlImgProfile} alt="cantik" className="object-cover w-[80px] h-[80px] rounded-full" />
                      <p className="text-[.9rem] font-semibold capitalize">{item.username}</p>
                      <Button fullWidth variant="filled" size="xs" radius={'md'}>Ikuti</Button>
                    </Flex>
                  </div>
                )
              })
            ) : null}
          </div>
        </div>
      </div>
    </>
  )
}