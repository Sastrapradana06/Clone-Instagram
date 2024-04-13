import { TbBoxPadding } from "react-icons/tb";
import { Flex } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useShallow } from 'zustand/react/shallow'
import useAppStore from "../../store/store";
import { useEffect } from "react";


export default function PostinganUser() {
  const [userPostingan, getUserPostingan,] = useAppStore(
    useShallow((state) => [state.userPostingan, state.getUserPostingan])
  )


  useEffect(() => {
    getUserPostingan()
  }, [])


  const navigate = useNavigate()


  return (
    <div className="w-full h-max mt-2 mb-[60px]">
      <Flex className="w-[90%] m-auto h-[50px] border-b" justify={'center'} align={'center'}>
        <TbBoxPadding size={35} />
      </Flex>
      <Flex className="w-full h-max mt-1 gap-[1.5px]" wrap={'wrap'} justify={''}>
        {userPostingan ? (
          userPostingan.map((item, i) => {
            return (
              <div className="w-[33%] h-[150px] mt-1 cursor-pointer" key={i} onClick={() => navigate(`/detail-postingan/${item.id}`)}>
                <img src={item.data.img_url} alt="status" className="w-full h-full object-cover" />
              </div>
            )
          })
        ) : null}
      </Flex>
    </div>
  )
}