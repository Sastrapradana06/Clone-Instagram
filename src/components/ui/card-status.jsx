import { AiOutlineMore } from "react-icons/ai";
import { Flex, Progress } from '@mantine/core';
import { useEffect, useState } from "react";
import { FiHeart } from "react-icons/fi";
import { useShallow } from 'zustand/react/shallow'
import useAppStore from '../../store/store';


// eslint-disable-next-line react/prop-types
export default function CardStatus({ imgProfil, imgStatus, textStatus, username }) {
  const [timesStatus, setTimeStatus] = useState(0)
  const [setIsShowStatus] = useAppStore(
    useShallow((state) => [state.setIsShowStatus])
  )


  useEffect(() => {
    const interval = setInterval(() => {
      setTimeStatus(prevTime => {
        if (prevTime >= 100) {
          setIsShowStatus(false)
          clearInterval(interval);
          return prevTime;
        } else {
          return prevTime + 25;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);



  return (
    <div className="w-full h-max bg-zinc-800 relative text-white" style={{ fontFamily: 'Montserrat', fontWeight: 400 }}>
      <div className="w-full h-[92vh]">
        <img src={`${imgStatus}`} alt="img_status" className="w-full h-full object-cover brightness-90" />
      </div>
      <Flex className="absolute top-[10px] w-[100%] h-max m-auto z-20 " direction={'column'} align={'center'} gap={'xs'}>
        <div className="w-[93%] h-max">
          <Progress size="xs" value={timesStatus} color="pink" />
        </div>
        <Flex className="w-[90%] h-max" justify={'space-between'} align={'center'}>
          <Flex align={'center'} gap={'sm'}>
            <img src={`${imgProfil}`} alt="img_profil" className="w-[35px] h-[35px] rounded-full object-cover" />
            <p className="text-[.8rem] font-bold">{username}</p>
          </Flex>
          <AiOutlineMore size={25} color="white" />
        </Flex>
      </Flex>
      <div className="w-full h-[8vh] flex justify-center items-center">
        {textStatus ? (
          <p>{textStatus}</p>
        ) : (
          <Flex className="w-[90%] h-full m-auto" align={'center'} justify={'space-between'}>
            <input
              type="text"
              className="w-[85%] bg-transparent border border-zinc-500 outline-none px-5 py-2 rounded-full text-[.9rem]"
              placeholder="Kirim pesan"
            />
            <FiHeart size={25} className="text-white cursor-pointer" />
          </Flex>
        )}
      </div>
    </div>
  )
}