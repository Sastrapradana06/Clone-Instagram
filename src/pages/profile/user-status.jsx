import { TbBoxPadding } from "react-icons/tb";
import { Flex } from "@mantine/core";
import { useNavigate } from "react-router-dom";

export default function UserStatus() {

  const navigate = useNavigate()

  const dataStatusUser = [
    {
      id: 1,
      imgUrl: 'https://i.pinimg.com/564x/bf/b6/40/bfb640e8eb5febb8e7b168d1e3ad26a1.jpg'
    },
    {
      id: 2,
      imgUrl: 'https://i.pinimg.com/564x/c1/5e/38/c15e3871f577f82c9db6c69583ad73fc.jpg'
    },
    {
      id: 3,
      imgUrl: 'https://i.pinimg.com/564x/7c/08/ec/7c08ec88e6d666d0a848483137b5ab11.jpg'
    },
    {
      id: 4,
      imgUrl: 'https://i.pinimg.com/736x/3e/49/fc/3e49fc9941b79f0fe1709d5ae149c97c.jpg'
    },
  ]


  return (
    <div className="w-full h-max mt-2 mb-[60px]">
      <Flex className="w-[90%] m-auto h-[50px] border-b" justify={'center'} align={'center'}>
        <TbBoxPadding size={35} />
      </Flex>
      <Flex className="w-full h-max mt-1 " wrap={'wrap'} justify={'space-between'}>
        {dataStatusUser ? (
          dataStatusUser.map((item, i) => {
            return (
              <div className="w-[33%] h-[150px] mt-1 cursor-pointer" key={i} onClick={() => navigate(`/profile/postingan-user/${item.id}`)}>
                <img src={item.imgUrl} alt="status" className="w-full h-full object-cover" />
              </div>
            )
          })
        ) : null}
      </Flex>
    </div>
  )
}