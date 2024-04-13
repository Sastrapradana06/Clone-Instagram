import { useParams } from "react-router-dom";
import { Flex } from "@mantine/core";
import { useEffect } from "react";
import CardPostingan from "../../components/ui/card-postingan";
import NavLink from "../../components/ui/nav-link";
import useAppStore from "../../store/store";
import { useShallow } from "zustand/react/shallow";
import { getCookies, getUserIdByCookies } from "../../store/utils";
import useLovePostingan from "../../hooks/useLovePostingan";
import useBookmark from "../../hooks/useBookmark";

export default function DetailPostingan() {
  const [userPostingan, updateUserPostingan] = useAppStore(
    useShallow((state) => [state.userPostingan, state.updateUserPostingan])
  )
  const { id } = useParams()
  const user_id = getUserIdByCookies()


  const prevLink = getCookies('prevLink')
  const [handleLove] = useLovePostingan()
  const [handleBookmark] = useBookmark()


  useEffect(() => {
    if (id) {
      const parseId = id.toString()
      const homeElement = document.getElementById(parseId);
      if (homeElement) {
        homeElement.scrollIntoView();
      }
    }

  }, [id])


  const lovePostingan = async (id) => {
    await handleLove(id, user_id, userPostingan, updateUserPostingan)
  }

  const bookmarkPostingan = async (id) => {
    await handleBookmark(id, user_id, userPostingan, updateUserPostingan)
  }


  return (
    <div className="w-full min-h-[100vh] max-h-max bg-zinc-800 text-white  -mb-7">
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
                handleLove={lovePostingan}
                time={item.data.time}
                bookmark={item.data.bookmark}
                handleBookmark={bookmarkPostingan}
              />
            )
          })
        ) : null}
      </Flex>
    </div>
  )
}