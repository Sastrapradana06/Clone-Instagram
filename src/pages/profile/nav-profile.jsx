import { FiPlusSquare } from "react-icons/fi";
import { IoAt } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { Flex, Menu, rem } from '@mantine/core';
import { useShallow } from 'zustand/react/shallow'
import useAppStore from '../../store/store';
import { deleteAllCookies, createCookies } from "../../store/utils";
import { useNavigate, useLocation } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import { useEffect } from 'react'

export default function NavProfile() {
  const [dataUser, resetState] = useAppStore(
    useShallow((state) => [state.dataUser, state.resetState])
  )

  const navigate = useNavigate()
  const { pathname } = useLocation();

  useEffect(() => {
    createCookies('prevLink', pathname)
  }, [pathname])


  const logOut = () => {
    resetState()
    deleteAllCookies()
    navigate('/')
  }

  const MenuBar = () => {
    return (
      <Menu shadow="md" width={100}>
        <Menu.Target>
          <button>
            <GiHamburgerMenu size={23} className="text-white cursor-pointer" />
          </button>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>Application</Menu.Label>
          <Menu.Item
            color="red"
            leftSection={<IoIosLogOut style={{ width: rem(14), height: rem(14) }} />}
            onClick={logOut}
          >
            Keluar
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    )
  }

  return (
    <Flex className="w-[100%] h-[50px]  px-4" justify={'space-between'} align={'center'}>
      <h1 style={{ fontFamily: 'Poppins', fontWeight: 400 }} className="text-[.9rem]">{dataUser ? dataUser.nama_pengguna : ''}</h1>
      <div className="flex gap-4 w-max">
        <IoAt size={23} className="text-white cursor-pointer" />
        <FiPlusSquare size={23} className="text-white cursor-pointer" />
        <div className="w-max h-max">
          <MenuBar />
        </div>

      </div>
    </Flex>
  )
}