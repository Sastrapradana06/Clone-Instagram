import { useParams } from "react-router-dom";
import NavLink from "../../../components/ui/nav-link";
import { Flex } from "@mantine/core";
import { useEffect } from "react";
import CardPostingan from "../../../components/ui/card-postingan";
import { useShallow } from 'zustand/react/shallow'
import useAppStore from "../../../store/store";
import { handleLovePostingan, handlebookmarkPostingan } from "../../../store/api";
import { getCookies, getUserIdByCookies } from "../../../store/utils";



export default function DetailPostinganUser() {
  const [userPostingan, updateUserPostingan] = useAppStore(
    useShallow((state) => [state.userPostingan, state.updateUserPostingan])
  )
  const { id } = useParams()
  const user_id = getUserIdByCookies()


  const prevLink = getCookies('prevLink')


  useEffect(() => {
    if (id) {
      const parseId = id.toString()
      const homeElement = document.getElementById(parseId);
      if (homeElement) {
        homeElement.scrollIntoView();
      }
    }

  }, [id])

  const handleLove = async (id) => {
    const data = { id, id_user: user_id }
    const res = await handleLovePostingan(data)
    if (res.status) {
      const newData = userPostingan.map((item) => {
        if (item.id == res.data.id) {
          return {
            ...item,
            data: {
              ...item.data,
              love: res.data.love
            }
          }
        }

        return item;
      })
      updateUserPostingan(newData)
    }
  }

  const handleBookmark = async (id) => {
    const data = { id, id_user: user_id }
    const res = await handlebookmarkPostingan(data)
    if (res.status) {
      const newData = userPostingan.map((item) => {
        if (item.id == res.data.id) {
          return {
            ...item,
            data: {
              ...item.data,
              bookmark: res.data.bookmark
            }
          }
        }
        return item;
      })
      updateUserPostingan(newData)
    }
  }

  return (
    <div className="w-full min-h-[100vh] max-h-max bg-zinc-800 text-white">
      <NavLink title={'Postingan'} url={prevLink} />
      <Flex className="w-full h-max pt-[4rem]  pb-2" direction={'column'} gap={'md'}>
        {userPostingan ? (
          userPostingan.map((item, i) => {
            return (
              <CardPostingan
                key={i}
                id={item.id}
                user_id={item.data.user_id}
                profileImageUrl={item.data.img_profil}
                nama_pengguna={item.data.nama_pengguna}
                postImageUrl={item.data.img_url}
                likes={item.data.love}
                statusText={item.data.deskripsi}
                handleLove={handleLove}
                time={item.data.time}
                bookmark={item.data.bookmark}
                handleBookmark={handleBookmark}
              />
            )
          })
        ) : null}
      </Flex>
    </div>
  )
}