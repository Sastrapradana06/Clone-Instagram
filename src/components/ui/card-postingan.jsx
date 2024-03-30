import { Flex } from '@mantine/core';
import { FaHeart, FaRegBookmark } from "react-icons/fa";
import { AiOutlineMore } from "react-icons/ai";
import { TbMessageCircle } from "react-icons/tb";
import { LuSend } from "react-icons/lu";
import ReadMore from './read-more';

export default function CardPostingan(...props) {
  // eslint-disable-next-line react/prop-types
  const { key, uniqueKey, profileImageUrl, username, postImageUrl, likes, statusText } = props[0];
  return (
    <Flex id={`${uniqueKey}`} className="w-full h-max pb-2" direction={'column'} align={'center'} style={{ fontFamily: 'Montserrat', fontWeight: 400 }} key={`${key}`}>
      <Flex className="w-[90%] h-[50px]" justify={'space-between'} align={'center'}>
        <Flex className="w-max" align={'center'} gap={'sm'}>
          <img src={`${profileImageUrl}`} alt="pp" className="w-[40px] h-[40px] rounded-full border-2 border-sky-800 object-cover" />
          <p className="text-[.9rem]">{username}</p>
        </Flex>
        <AiOutlineMore size={30} color="white" />
      </Flex>
      <div className="w-full h-[500px]">
        <img src={`${postImageUrl}`} alt="status" className="w-full h-full object-cover" />
      </div>
      <Flex className="w-[90%] h-[50px]" justify={'space-between'} align={'center'}>
        <Flex className="w-max" align={'center'} gap={'sm'}>
          <FaHeart size={24} color="crimson" />
          <TbMessageCircle size={24} color="white" />
          <LuSend size={24} color="white" />
        </Flex>
        <FaRegBookmark size={24} color="white" />
      </Flex>
      <Flex className="w-[90%] h-max text-[.8rem]" direction={'column'}>
        <p>{likes} suka</p>
        <ReadMore text={`${statusText}`} />
      </Flex>
    </Flex>
  )
}