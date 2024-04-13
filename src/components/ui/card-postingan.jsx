/* eslint-disable react/prop-types */
import { Flex, Menu, rem } from '@mantine/core';
import { FaHeart, FaRegBookmark, FaRegHeart } from "react-icons/fa";
import { AiOutlineMore, AiOutlineExclamationCircle } from "react-icons/ai";
import { TbMessageCircle } from "react-icons/tb";
import { LuSend } from "react-icons/lu";
import { HiPencil } from "react-icons/hi";
import ReadMore from './read-more';
import { createCookies, formatFirestoreTimestamp, formatPengikut, getUserIdByCookies } from '../../store/utils';
import useAppStore from '../../store/store';
import { useShallow } from 'zustand/react/shallow';
import { MdDelete } from "react-icons/md";
import { useState } from 'react';
import ShowModal from './modal';
import { deletePostingan } from '../../store/api';
import { useNavigate, useLocation } from "react-router-dom";
import { deleteImage } from '../../store/db';




export default function CardPostingan(...props) {
  const [isModal, setIsModal] = useState(false)
  const [getUserPostingan] = useAppStore(
    useShallow((state) => [state.getUserPostingan])
  )
  const { key, id, user_id, profileImageUrl, nama_pengguna, postImageUrl, likes, statusText, handleLove, time, bookmark, handleBookmark } = props[0];

  const idUser = getUserIdByCookies()

  const navigate = useNavigate()
  const { pathname } = useLocation();


  const handleNavigate = (user_id, nama_pengguna) => {
    createCookies('prevLink2', pathname)
    if (idUser == user_id) {
      navigate('/profile')
    } else {
      navigate(`/detail-profile/${nama_pengguna}`)
    }
  };

  const handleDelete = async () => {
    const res = await deletePostingan(id)
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
            onClick={() => navigate(`/edit-postingan/${id}`)}
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
            onClick={() => alert('Fitur empty')}
          >
            Sembunyikan
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    )
  }

  return (
    <Flex id={`${id}`} className="w-full h-max" direction={'column'} align={'center'} style={{ fontFamily: 'Montserrat', fontWeight: 400 }} key={`${key}`}>
      {isModal && (
        <ShowModal>
          <div className="w-[90%] bg-zinc-200 shadow-xl flex flex-col items-center gap-4 text-black p-2 rounded-lg">
            <div className="w-[90%] h-max text-center flex flex-col items-center">
              <button className='p-2 bg-red-200 rounded-full'>
                <AiOutlineExclamationCircle fill='crimson' size={23} />
              </button>
              <p className="text-[.9rem] font-bold">Delete Postingan</p>
              <p className="text-[.7rem] font-semibold text-zinc-400 mt-1 text-center">postingan yang telah dihapus tidak bisa dipulihkan</p>
            </div>
            <div className="w-[90%] h-max flex gap-4 items-center justify-center mb-2">
              <button className="py-2 px-10 border text-[.8rem] bg-gray-300  rounded-lg hover:bg-gray-400 " onClick={() => setIsModal(false)}>No</button>
              <button className="py-2 px-10 bg-red-500 text-[.8rem] text-white hover:bg-red-600 rounded-lg" onClick={handleDelete}>Yes</button>
            </div>
          </div>
        </ShowModal>
      )}
      <Flex className="w-[90%] h-[50px]" justify={'space-between'} align={'center'}>
        <Flex className="w-max cursor-pointer" align={'center'} gap={'sm'} onClick={() => handleNavigate(user_id, nama_pengguna)}>
          <img src={`${profileImageUrl}`} alt="pp" loading='lazy' className={`w-[40px] h-[40px] rounded-full border-2 object-cover ${idUser == user_id ? 'border-white ' : 'border-sky-800 '}`} />
          <p className="text-[.9rem]">{nama_pengguna}</p>
        </Flex>
        <div className="w-max h-max">
          {user_id == idUser ? (
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
          {likes.includes(idUser) ? (
            <FaHeart size={24} color="crimson" className='cursor-pointer' onClick={() => handleLove(id)} />
          ) : <FaRegHeart size={24} color="white" onClick={() => handleLove(id)} className='cursor-pointer' />}
          <TbMessageCircle size={24} color="white" />
          <LuSend size={24} color="white" />
        </Flex>
        {bookmark.includes(idUser) ? (
          <FaRegBookmark size={24} onClick={() => handleBookmark(id)} className='cursor-pointer text-sky-500' />
        ) : (
          <FaRegBookmark size={24} color="white" onClick={() => handleBookmark(id)} className='cursor-pointer' />
        )}
      </Flex>
      <Flex className="w-[90%] h-max text-[.8rem]" direction={'column'}>
        <p className='font-semibold'>{formatPengikut(likes?.length)} suka</p>
        <p className='text-[.8rem] text-zinc-300'>{formatFirestoreTimestamp(time)}</p>
        <ReadMore text={`${statusText}`} />
      </Flex>
    </Flex>
  )
}
