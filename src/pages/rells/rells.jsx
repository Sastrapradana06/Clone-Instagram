
import { useEffect, useState } from "react";
import AppShell from "../../components/layout/app-shell";
import { Tabs } from '@mantine/core';
import { FaHeart, FaRegBookmark } from "react-icons/fa";
import { getAllPostingan } from "../../store/api";
import useAppStore from "../../store/store";
import { useShallow } from "zustand/react/shallow";
import { useNavigate } from "react-router-dom";
import { createCookies, getUserIdByCookies } from "../../store/utils";
import { ImSpinner9 } from "react-icons/im";




export default function Rells() {
  const [updateUserPostingan] = useAppStore(
    useShallow((state) => [state.updateUserPostingan])
  )
  const [isLoading, setIsLoading] = useState(false)
  const [dataSuka, setDataSuka] = useState([])
  const [dataBookmark, setDataBookmark] = useState([])
  const navigate = useNavigate()
  const user_id = getUserIdByCookies()


  const getSuka = async () => {
    setIsLoading(true)
    const res = await getAllPostingan()
    if (res.status) {
      createCookies('prevLink', '/rells')
      const filterData = res.data.filter(item => item.data.love.includes(user_id))
      setDataSuka(filterData)
      updateUserPostingan(filterData)
    }
    setIsLoading(false)
  }

  const getBookMark = async () => {
    setIsLoading(true)
    const res = await getAllPostingan()
    if (res.status) {
      const filterData = res.data.filter(item => item.data.bookmark.includes(user_id))
      setDataBookmark(filterData)
      updateUserPostingan(filterData)
    }
    setIsLoading(false)
  }


  useEffect(() => {
    getSuka()
  }, [])


  return (
    <AppShell>
      <div className="min-w-full max-w-max h-max flex flex-col gap-2 items-center py-4">
        <Tabs defaultValue="suka" variant="default" className=" w-full flex justify-between gap-1">
          <Tabs.List grow justify="space-between">
            <Tabs.Tab value="suka" leftSection={<FaHeart size={15} fill="crimson" />} className="hover:bg-transparent" onClick={getSuka}>
              Suka
            </Tabs.Tab>
            <Tabs.Tab value="bookmark" leftSection={<FaRegBookmark size={15} className="text-sky-500" />} className="hover:bg-transparent" onClick={getBookMark}>
              Bookmark
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="suka" className=" w-full mb-[60px] flex mt-2">
            {dataSuka.length > 0 ? (
              dataSuka.map((item, i) => (
                <div className="w-[33%] h-[150px] mt-1 cursor-pointer" key={i} onClick={() => navigate(`/profile/detail-postingan/${item.id}`)}>
                  <img src={item.data.img_url} alt="status" className="w-full h-full object-cover" loading='lazy' />
                </div>
              ))
            ) : (
              isLoading ? (
                <div className="w-full h-[60vh] flex justify-center items-center">
                  <ImSpinner9 size={30} className='text-sky-400 animate-spin' />
                </div>
              ) : (
                <div className="w-full h-max mt-2">
                  <p className='text-center text-[.8rem] text-zinc-300'>Tidak ada postingan yang anda sukai</p>
                </div>
              )
            )
            }
          </Tabs.Panel>
          <Tabs.Panel value="bookmark" >
            {dataBookmark.length > 0 ? (
              dataBookmark.map((item, i) => (
                <div className="w-[33%] h-[150px] mt-1 cursor-pointer" key={i} onClick={() => navigate(`/profile/detail-postingan/${item.id}`)}>
                  <img src={item.data.img_url} alt="status" className="w-full h-full object-cover" loading='lazy' />
                </div>
              ))
            ) : (
              isLoading ? (
                <div className="w-full h-[60vh] flex justify-center items-center">
                  <ImSpinner9 size={30} className='text-sky-400 animate-spin' />
                </div>
              ) : (
                <div className="w-full h-max mt-2">
                  <p className='text-center text-[.8rem] text-zinc-300'>Tidak ada postingan yang anda simpan</p>
                </div>
              )
            )
            }
          </Tabs.Panel>

        </Tabs>
      </div>
    </AppShell>
  )
}