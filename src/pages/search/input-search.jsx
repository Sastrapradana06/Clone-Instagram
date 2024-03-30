import { Flex } from '@mantine/core';
import { IoSearch } from "react-icons/io5";

export default function InputSearch() {
  return (
    <Flex className="w-[90%] h-max m-auto px-4 py-1 bg-zinc-700 rounded-xl" align={'center'} gap={'md'}>
      <IoSearch size={20} />
      <input type="text" className="bg-transparent w-full outline-none " placeholder="Cari" />
    </Flex>
  )
}