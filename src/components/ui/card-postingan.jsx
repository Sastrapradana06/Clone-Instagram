/* eslint-disable react/prop-types */
import { Flex, Menu, rem } from '@mantine/core';
import { FaHeart, FaRegBookmark, FaRegHeart } from "react-icons/fa";
import { AiOutlineMore } from "react-icons/ai";
import { TbMessageCircle } from "react-icons/tb";
import { LuSend } from "react-icons/lu";
import { HiPencil } from "react-icons/hi";
import ReadMore from './read-more';
import { formatPengikut } from '../../store/utils';
import useAppStore from '../../store/store';
import { useShallow } from 'zustand/react/shallow';
import { MdDelete } from "react-icons/md";
import { useState } from 'react';
import ShowModal from './modal';
import { deletePostingan } from '../../store/api';
import { useNavigate } from "react-router-dom";
import { deleteImage } from '../../store/db';




export default function CardPostingan(...props) {
  const [isModal, setIsModal] = useState(false)
  const [dataUser, getUserPostingan] = useAppStore(
    useShallow((state) => [state.dataUser, state.getUserPostingan])
  )
  const { key, uniqueKey, profileImageUrl, nama_pengguna, postImageUrl, likes, statusText, handleLove } = props[0];

  const jumlahLike = likes?.length

  const navigate = useNavigate()

  const handleDelete = async () => {
    const res = await deletePostingan(uniqueKey)
    if (res.status) {
      await deleteImage(postImageUrl)
      await getUserPostingan()
      setIsModal(false)
      navigate('/profile')
    }
  }


  const MenuComponentUser = () => {
    return (
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <button>
            <AiOutlineMore size={30} color="white" className='cursor-pointer' />
          </button>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>Application</Menu.Label>
          <Menu.Item
            color="teal"
            leftSection={<HiPencil style={{ width: rem(14), height: rem(14) }} />}
            onClick={() => navigate(`/edit-postingan/${uniqueKey}`)}
          >
            Edit postingan
          </Menu.Item>
          <Menu.Item
            color="red"
            leftSection={<MdDelete style={{ width: rem(14), height: rem(14) }} />}
            onClick={() => setIsModal(true)}
          >
            Delete postingan
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    )
  }
  const MenuComponentPublic = () => {
    return (
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <button>
            <AiOutlineMore size={30} color="white" className='cursor-pointer' />
          </button>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>Application</Menu.Label>
          <Menu.Item
            color="orange"
            leftSection={<MdDelete style={{ width: rem(14), height: rem(14) }} />}
            onClick={handleDelete}
          >
            Sembunyikan
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    )
  }

  return (
    <Flex id={`${uniqueKey}`} className="w-full h-max" direction={'column'} align={'center'} style={{ fontFamily: 'Montserrat', fontWeight: 400 }} key={`${key}`}>
      {isModal && (
        <ShowModal>
          <div className="w-[90%] bg-zinc-700 shadow-xl flex flex-col items-center gap-4 text-white p-2 rounded-md border-red-500 border">
            <div className="w-full h-max text-center">
              <p className="text-[.8rem] font-bold">⛔ Yakin untuk menghapus postingan ini?</p>
              <p className="text-[.7rem] font-semibold text-zinc-400 mt-1">postingan yang telah dihapus tidak bisa dipulihkan</p>
            </div>
            <div className="w-[60%] h-max flex gap-4 items-center mb-2">
              <button className="py-2 px-8 border border-sky-400 text-[.8rem] hover:bg-zinc-800 " onClick={() => setIsModal(false)}>No</button>
              <button className="py-2 px-8 border border-sky-400 bg-sky-500 text-[.8rem] hover:bg-sky-700" onClick={handleDelete}>Yes</button>
            </div>
          </div>
        </ShowModal>
      )}
      <Flex className="w-[90%] h-[50px]" justify={'space-between'} align={'center'}>
        <Flex className="w-max" align={'center'} gap={'sm'}>
          <img src={`${profileImageUrl}`} alt="pp" className="w-[40px] h-[40px] rounded-full border-2 border-sky-800 object-cover" />
          <p className="text-[.9rem]">{nama_pengguna}</p>
        </Flex>
        <div className="w-max h-max">
          {nama_pengguna == dataUser?.nama_pengguna ? (
            <MenuComponentUser />
          ) : (
            <MenuComponentPublic />
          )}
        </div>
      </Flex>
      <div className="w-full h-[500px]">
        <img src={`${postImageUrl}`} alt="status" className="w-full h-full object-cover" />
      </div>
      <Flex className="w-[90%] h-[50px]" justify={'space-between'} align={'center'}>
        <Flex className="w-max" align={'center'} gap={'sm'}>
          {likes.includes(dataUser?.nama_pengguna) ? (
            <FaHeart size={24} color="crimson" className='cursor-pointer' onClick={() => handleLove(uniqueKey)} />
          ) : <FaRegHeart size={24} color="white" onClick={() => handleLove(uniqueKey)} className='cursor-pointer' />}
          <TbMessageCircle size={24} color="white" />
          <LuSend size={24} color="white" />
        </Flex>
        <FaRegBookmark size={24} color="white" />
      </Flex>
      <Flex className="w-[90%] h-max text-[.8rem]" direction={'column'}>
        <p className='text-zinc-300'>{formatPengikut(jumlahLike)} suka</p>
        <ReadMore text={`${statusText}`} />
      </Flex>
    </Flex>
  )
}
