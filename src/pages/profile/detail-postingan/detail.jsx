import { useParams } from "react-router-dom";
import NavLink from "../../../components/ui/nav-link";
import { Flex } from "@mantine/core";
import { useEffect } from "react";
import CardPostingan from "../../../components/ui/card-postingan";
import { useShallow } from 'zustand/react/shallow'
import useAppStore from "../../../store/store";
import { handleLovePostingan } from "../../../store/api";
import { ToastContainer } from 'react-toastify';
import { handleToast } from "../../../store/utils";



export default function DetailPostinganUser() {
  const [userPostingan, dataUser, getUserPostingan] = useAppStore(
    useShallow((state) => [state.userPostingan, state.dataUser, state.getUserPostingan])
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
      handleToast(res.message, '')
      getUserPostingan()
    } else {
      handleToast(res.message, 'error')
    }
  }

  return (
    <div className="w-full min-h-[100vh] max-h-max bg-zinc-800 text-white">
      <ToastContainer />
      <NavLink title={'Postingan'} url={'/profile'} />
      <Flex className="w-full h-max pt-[4rem]  pb-2" direction={'column'} gap={'md'}>
        {userPostingan ? (
          userPostingan.map((item) => {
            return (
              <CardPostingan
                key={item.id}
                uniqueKey={item.id}
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