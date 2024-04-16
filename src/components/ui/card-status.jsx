/* eslint-disable react/prop-types */
import { AiOutlineMore } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
import { Flex, Indicator } from '@mantine/core';
import { useEffect } from "react";
// import { FiHeart } from "react-icons/fi";
import { useShallow } from 'zustand/react/shallow'
import useAppStore from '../../store/store';
import { Carousel } from '@mantine/carousel';
import { Menu, rem, Progress } from '@mantine/core';
import { getUserIdByCookies, formatFirestoreTimestamp } from "../../store/utils";
import { MdDelete } from "react-icons/md";
import { deleteStatusUser } from "../../services/useApi";
import { deleteImage } from "../../services/db";
import { useNavigate } from "react-router-dom";



// eslint-disable-next-line react/prop-types
export default function CardStatus({ data, id }) {
  const idUser = getUserIdByCookies()
  const [setIsShowStatus, getUserStatus, dataUser] = useAppStore(
    useShallow((state) => [state.setIsShowStatus, state.getUserStatus, state.dataUser])
  )

  const navigate = useNavigate()

  useEffect(() => {
    if (id) {
      const homeElement = document.getElementById(id);
      if (homeElement) {
        homeElement.scrollIntoView();
      }
    }

  }, [])

  const MenuComponentUser = ({ id, img_url }) => {
    return (
      <Menu shadow="md" width={100}>
        <Menu.Target>
          <button>
            <AiOutlineMore size={30} color="white" className='cursor-pointer' />
          </button>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>Application</Menu.Label>
          <Menu.Item
            color="red"
            leftSection={<IoCloseSharp style={{ width: rem(14), height: rem(14) }} />}
            onClick={() => setIsShowStatus(false)}
          >
            Close
          </Menu.Item>
          <Menu.Item
            color="red"
            leftSection={<MdDelete style={{ width: rem(14), height: rem(14) }} />}
            onClick={() => deleteStatus(id, img_url)}
          >
            Delete
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    )
  }

  const deleteStatus = async (id, img_url) => {
    const res = await deleteStatusUser(id)
    if (res.status) {
      await deleteImage(img_url)
      await getUserStatus()
      setIsShowStatus(false)
    }
  }

  const handleNavigate = (nama_pengguna) => {
    setIsShowStatus(false)
    if (nama_pengguna !== dataUser.nama_pengguna) {
      navigate(`/detail-profile/${nama_pengguna}`)
    } else {
      navigate(`/profile`)
    }
  }


  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setTimeStatus(prevTime => {
  //       if (prevTime >= 100) {
  //         setIsShowStatus(false)
  //         clearInterval(interval);
  //         return prevTime;
  //       } else {
  //         return prevTime + 25;
  //       }
  //     });
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, []);


  return (
    <>
      {/* <div className="absolute w-[90%]  left-0 right-0 flex gap-1 h-max z-30 p-1 m-auto">
        {data.map((item) => (
          <div className="w-full h-max" key={item.id}>
            <Progress size="xs" radius={"lg"} value={100} color={'pink'} />
          </div>
        ))}
      </div> */}
      <Carousel
        height={"100vh"}
        withControls={false}
        withIndicators
        classNames={{ indicators: 'p-2 w-full absolute top-0 h-max' }}
      >
        {data.map((status, index) => (
          <Carousel.Slide key={index}>
            <div key={index} className="w-full h-[100vh] flex-none" id={status.id} >
              <img src={status.data.img_status} alt={`img_status_${index}`} className="w-screen h-full object-cover brightness-90" loading="lazy" />
              <Flex className="absolute top-[15px] w-[100%] h-max m-auto z-20 " direction={'column'} align={'center'} gap={'xs'}>
                <Flex className="w-[90%] h-max" justify={'space-between'} align={'center'}>
                  <Flex align={'center'} gap={'sm'} className="">
                    <img src={status.data.img_profil} alt={`img_profil_${index}`} className="w-[50px] h-[50px] rounded-full object-cover cursor-pointer" loading="lazy" onClick={() => handleNavigate(status.data.nama_pengguna)} />
                    <Flex direction={'column'}>
                      <p className="text-[.9rem] font-bold">{status.data.nama_pengguna}</p>
                      <p className="text-[.7rem] text-zinc-300">{formatFirestoreTimestamp(status.data.time)}</p>
                    </Flex>
                  </Flex>
                  {idUser == status.data.user_id ? (
                    <MenuComponentUser id={status.id} img_url={status.data.img_status} />
                  ) : (
                    <IoCloseSharp size={25} color="crimson" onClick={() => setIsShowStatus(false)} className="cursor-pointer" />
                  )}
                </Flex>
              </Flex>
            </div>
          </Carousel.Slide>
        ))}
      </Carousel>
    </>
  )
}


