
import { AiOutlineMore } from "react-icons/ai";
import { Flex, Progress } from '@mantine/core';
import { useEffect, useState } from "react";
import { FiHeart } from "react-icons/fi";


export default function Rells() {
  const [timesStatus, setTimeStatus] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeStatus(prevTime => {
        if (prevTime >= 100) {
          clearInterval(interval);
          return prevTime;
        } else {
          return prevTime + 10;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  console.log({ timesStatus });

  return (
    <div className="w-full h-max bg-zinc-800 relative text-white" style={{ fontFamily: 'Montserrat', fontWeight: 400 }}>
      <div className="w-full h-[90vh]">
        <img src="https://i.pinimg.com/564x/79/44/05/794405d8840389a7c67093f1aa6d34f6.jpg" alt="" className="w-full h-full object-cover" />
      </div>
      <Flex className="absolute top-[10px] w-[100%] h-max m-auto z-20 " direction={'column'} align={'center'} gap={'xs'}>
        <div className="w-[93%] h-max">
          <Progress size="xs" value={timesStatus} color="pink" />
        </div>
        <Flex className="w-[90%] h-max" justify={'space-between'} align={'center'}>
          <Flex align={'center'} gap={'sm'}>
            <img src="https://i.pinimg.com/564x/49/70/06/49700665c8e6366b866bf56e95ad60b6.jpg" alt="img_profil" className="w-[35px] h-[35px] rounded-full object-cover" />
            <p className="text-[.8rem] font-bold">queen</p>
          </Flex>
          <AiOutlineMore size={25} color="white" />
        </Flex>
      </Flex>
      <div className="w-full h-[10vh] ">
        <Flex className="w-[90%] h-full m-auto" align={'center'} justify={'space-between'}>
          <input
            type="text"
            className="w-[85%] bg-transparent border border-zinc-500 outline-none px-5 py-3 rounded-full text-[.9rem]"
            placeholder="Kirim pesan"
          />
          <FiHeart size={25} className="text-white cursor-pointer" />

        </Flex>
      </div>
    </div>
  )
}