/* eslint-disable react/prop-types */
// import { AiOutlineMore } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
import { Flex, Progress } from '@mantine/core';
import { useEffect } from "react";
// import { FiHeart } from "react-icons/fi";
import { useShallow } from 'zustand/react/shallow'
import useAppStore from '../../store/store';


// eslint-disable-next-line react/prop-types
export default function CardStatus({ data, id }) {
  // const [timesStatus, setTimeStatus] = useState(0)
  const [setIsShowStatus] = useAppStore(
    useShallow((state) => [state.setIsShowStatus])
  )

  useEffect(() => {
    if (id) {
      const homeElement = document.getElementById(id);
      if (homeElement) {
        homeElement.scrollIntoView();
      }
    }

  }, [])


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
      <div className="absolute w-[100%] flex gap-1 h-max z-30 p-1">
        {data.map((item) => (
          <div className="w-full h-max" key={item.id}>
            <Progress size="xs" radius={"lg"} color="pink" />
          </div>
        ))}
      </div>
      <div className="w-full h-max bg-zinc-800 relative text-white flex overflow-x-scroll" style={{ fontFamily: 'Montserrat', fontWeight: 400 }}>
        {data.map((status, index) => (
          <div key={index} className="w-full h-[100vh] flex-none" id={status.id}>
            <img src={status.data.img_status} alt={`img_status_${index}`} className="w-full h-full object-cover brightness-90" loading="lazy" />
            <Flex className="absolute top-[15px] w-[100%] h-max m-auto z-20 " direction={'column'} align={'center'} gap={'xs'}>
              <Flex className="w-[90%] h-max" justify={'space-between'} align={'center'}>
                <Flex align={'center'} gap={'sm'}>
                  <img src={status.data.img_profil} alt={`img_profil_${index}`} className="w-[35px] h-[35px] rounded-full object-cover" loading="lazy" />
                  <p className="text-[.8rem] font-bold">{status.data.nama_pengguna}</p>
                </Flex>
                <IoCloseSharp size={25} color="crimson" onClick={() => setIsShowStatus(false)} className="cursor-pointer" />
              </Flex>
            </Flex>
          </div>
        ))}
      </div>
    </>
  )
}
{/* <div className="w-full h-[8vh] flex justify-center items-center">
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
      </div> */}