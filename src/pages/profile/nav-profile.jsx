import { FiPlusSquare } from "react-icons/fi";
import { IoAt } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { Flex } from '@mantine/core';
import { useShallow } from 'zustand/react/shallow'
import useAppStore from '../../store/store';
import { deleteAllCookies } from "../../store/utils";
import { useNavigate } from "react-router-dom";

export default function NavProfile() {
  const [dataUser, updateDataUser] = useAppStore(
    useShallow((state) => [state.dataUser, state.updateDataUser])
  )

  const navigate = useNavigate()

  const logOut = () => {
    updateDataUser(undefined)
    deleteAllCookies()
    navigate('/')
  }

  return (
    <Flex className="w-[100%] h-[50px]  px-4" justify={'space-between'} align={'center'}>
      <h1 style={{ fontFamily: 'Poppins', fontWeight: 400 }} className="text-[.9rem]">{dataUser ? dataUser.nama_pengguna : ''}</h1>
      <div className="flex gap-4 w-max">
        <IoAt size={23} className="text-white cursor-pointer" onClick={logOut} />
        <FiPlusSquare size={23} className="text-white cursor-pointer" />
        <GiHamburgerMenu size={23} className="text-white cursor-pointer" />
      </div>
    </Flex>
  )
}