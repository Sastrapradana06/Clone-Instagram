import { useParams } from "react-router-dom";
import NavLink from "../../../components/ui/nav-link";
import { Flex } from "@mantine/core";
import { useEffect } from "react";
import CardPostingan from "../../../components/ui/card-postingan";
import { useShallow } from 'zustand/react/shallow'
import useAppStore from "../../../store/store";
import { handleLovePostingan } from "../../../store/api";



export default function DetailPostinganUser() {
  const [userPostingan, dataUser, updateUserPostingan] = useAppStore(
    useShallow((state) => [state.userPostingan, state.dataUser, state.updateUserPostingan])
  )
  const { id } = useParams()

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
    const data = { id, nama_pengguna: dataUser.nama_pengguna }
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

  return (
    <div className="w-full min-h-[100vh] max-h-max bg-zinc-800 text-white">
      <NavLink title={'Postingan'} url={'/profile'} />
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
              />
            )
          })
        ) : null}
      </Flex>
    </div>
  )
}