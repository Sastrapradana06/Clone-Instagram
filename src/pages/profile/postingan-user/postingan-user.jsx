import { useParams } from "react-router-dom";
import NavLink from "../../../components/ui/nav-link";
import { Flex } from "@mantine/core";
import { useEffect } from "react";
import CardPostingan from "../../../components/ui/card-postingan";

export default function PostinganUser() {
  const { id } = useParams()

  const dataPostinagnUser = [
    {
      id: 1,
      profileImageUrl: 'https://i.pinimg.com/564x/c0/18/31/c0183163ba468401a02ae53b2665daa1.jpg',
      namaPengguna: 'sean_',
      likes: '130rb',
      imgUrl: 'https://i.pinimg.com/564x/bf/b6/40/bfb640e8eb5febb8e7b168d1e3ad26a1.jpg'
    },
    {
      id: 2,
      profileImageUrl: 'https://i.pinimg.com/564x/c0/18/31/c0183163ba468401a02ae53b2665daa1.jpg',
      namaPengguna: 'sean_',
      likes: '110rb',
      imgUrl: 'https://i.pinimg.com/564x/c1/5e/38/c15e3871f577f82c9db6c69583ad73fc.jpg'
    },
    {
      id: 3,
      profileImageUrl: 'https://i.pinimg.com/564x/c0/18/31/c0183163ba468401a02ae53b2665daa1.jpg',
      namaPengguna: 'sean_',
      likes: '240rb',
      imgUrl: 'https://i.pinimg.com/564x/7c/08/ec/7c08ec88e6d666d0a848483137b5ab11.jpg'
    },
    {
      id: 4,
      profileImageUrl: 'https://i.pinimg.com/564x/c0/18/31/c0183163ba468401a02ae53b2665daa1.jpg',
      namaPengguna: 'sean_',
      likes: '170rb',
      imgUrl: 'https://i.pinimg.com/736x/3e/49/fc/3e49fc9941b79f0fe1709d5ae149c97c.jpg'
    },
  ]

  useEffect(() => {
    if (id) {
      const parseId = id.toString()
      const homeElement = document.getElementById(parseId);
      if (homeElement) {
        homeElement.scrollIntoView();
      }
    }
  }, [id])

  return (
    <div className="w-full min-h-[100vh] max-h-max bg-zinc-800 text-white">
      <NavLink title={'Postingan'} url={'/profile'} />
      <Flex className="w-full h-max pt-[4rem]" direction={'column'} gap={'md'}>
        {dataPostinagnUser ? (
          dataPostinagnUser.map((item) => {
            return (
              <CardPostingan
                key={item.id}
                uniqueKey={item.id}
                profileImageUrl={item.profileImageUrl}
                username={item.namaPengguna}
                postImageUrl={item.imgUrl}
                likes={item.likes}
                statusText='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
              />
            )
          })
        ) : null}
      </Flex>
    </div>
  )
}