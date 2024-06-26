
import { Flex } from '@mantine/core';
import CardPostingan from "../../components/ui/card-postingan";
import { getAllPostingan } from '../../services/useApi';
import { useEffect, useState } from 'react';
import useAppStore from '../../store/store';
import { useShallow } from 'zustand/react/shallow';
import { ImSpinner9 } from "react-icons/im";
import { getUserIdByCookies } from '../../store/utils';
import useLovePostingan from '../../hooks/useLovePostingan';
import useBookmark from '../../hooks/useBookmark';

export default function Postingan() {
  const [dataPostingan, setDataPostingan] = useState([])
  const [dataUser] = useAppStore(
    useShallow((state) => [state.dataUser])
  )

  const user_id = getUserIdByCookies()

  const [isLoading, setIsLoading] = useState(false)
  const [handleLove] = useLovePostingan()
  const [handleBookmark] = useBookmark()



  // const data = [
  //   {
  //     id: 1,
  //     profileImageUrl: '/pp2.jfif',
  //     username: 'queen',
  //     postImageUrl: '/status.jfif',
  //     likes: [],
  //     statusText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  //   },
  //   {
  //     id: 2,
  //     profileImageUrl: 'https://i.pinimg.com/564x/e5/48/90/e54890195adfc5d0b47808fa5b1bd397.jpg',
  //     username: 'sasa_',
  //     postImageUrl: 'https://i.pinimg.com/564x/20/39/a6/2039a6c2f544623050d714f4ce184cfc.jpg',
  //     likes: [],
  //     statusText: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
  //   },
  //   {
  //     id: 3,
  //     profileImageUrl: 'https://i.pinimg.com/564x/ee/14/cd/ee14cd87d42517d42f7225bf8a31f5fe.jpg',
  //     username: 'cantikmu',
  //     postImageUrl: 'https://i.pinimg.com/564x/89/f2/fc/89f2fc0f93245f6ac7ad923ef5c6128e.jpg',
  //     likes: [],
  //     statusText: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
  //   },
  //   {
  //     id: 4,
  //     profileImageUrl: 'https://i.pinimg.com/564x/ae/5b/de/ae5bde3190e0a47e47a66a048b94e03c.jpg',
  //     username: 'ricky_harun',
  //     postImageUrl: 'https://i.pinimg.com/564x/25/62/7e/25627ebf38f5369055702fd512c421e3.jpg',
  //     likes: [],
  //     statusText: 'Cintaku padamu adalah seperti cerita indah yang tak pernah pudar, setiap detik bersamamu terasa magis dan penuh arti, kamu adalah cinta sejatiku yang membuat hatiku berdebar setiap kali mendengar namamu, bersamamu, hidupku berwarna-warni dan penuh kebahagiaan yang tiada tara, kamu adalah segalanya bagiku.'
  //   },
  //   {
  //     id: 5,
  //     profileImageUrl: 'https://i.pinimg.com/564x/49/70/06/49700665c8e6366b866bf56e95ad60b6.jpg',
  //     username: 'widya',
  //     postImageUrl: 'https://i.pinimg.com/564x/79/44/05/794405d8840389a7c67093f1aa6d34f6.jpg',
  //     likes: [],
  //     statusText: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
  //   },
  // ];

  const getPostingan = async () => {
    setIsLoading(true)
    const res = await getAllPostingan()
    if (res.status) {
      const filterData = res.data.filter(item => dataUser?.mengikuti.includes(item.data.user_id) || item.data.user_id == user_id)
      setDataPostingan(filterData)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    if (dataUser) {
      getPostingan()
    }
  }, [dataUser])

  const lovePostingan = async (id) => {
    await handleLove(id, user_id, dataPostingan, setDataPostingan)
  }

  const bookmarkPostingan = async (id) => {
    await handleBookmark(id, user_id, dataPostingan, setDataPostingan)
  }
  console.log({ dataPostingan, dataUser });


  return (
    <Flex className="w-full h-max  mb-[60px]" direction={'column'} align={'center'} gap={'md'}>
      {isLoading && (
        <div className="w-full h-[60vh] flex justify-center items-center">
          <ImSpinner9 size={30} className='text-sky-400 animate-spin' />
        </div>
      )}
      {dataPostingan.length > 0 && (
        dataPostingan.map((item) => {
          return (
            <CardPostingan
              key={item.id}
              id={item.id}
              user_id={item.data.user_id}
              profileImageUrl={item.data.img_profil}
              nama_pengguna={item.data.nama_pengguna}
              postImageUrl={item.data.img_url}
              likes={item.data.love}
              statusText={item.data.deskripsi}
              handleLove={lovePostingan}
              time={item.data.time}
              bookmark={item.data.bookmark}
              handleBookmark={bookmarkPostingan}
            />
          )
        })
      )}
    </Flex>
  )
}