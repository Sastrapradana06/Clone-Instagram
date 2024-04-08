import { RiHome3Fill } from "react-icons/ri";
import { FaRegPlusSquare } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { BiSolidVideos } from "react-icons/bi";
import { useLocation, useNavigate } from 'react-router-dom';
import useAppStore from "../../store/store";
import { useShallow } from 'zustand/react/shallow'



export default function NavBottom() {
  const [dataUser] = useAppStore(
    useShallow((state) => [state.dataUser])
  )

  const { pathname } = useLocation();
  const navigate = useNavigate()

  return (
    <div className="fixed bottom-0 bg-zinc-950 w-full h-max z-40">
      <div className="w-[90%] h-[50px]  m-auto flex items-center justify-between">
        <RiHome3Fill size={25} className={`${pathname == '/home' ? 'text-pink-700 ' : 'text-white'} cursor-pointer`} onClick={() => navigate('/home')} />
        <IoSearch size={25} className={`${pathname == '/search' ? 'text-pink-700 ' : 'text-white'} cursor-pointer`} onClick={() => navigate('/search')} />
        <FaRegPlusSquare size={25} className={`${pathname == '/rels' ? 'text-pink-700 ' : 'text-white'} cursor-pointer`} onClick={() => navigate('/create-postingan')} />
        <BiSolidVideos size={25} className={`${pathname == '/rells' ? 'text-pink-700 ' : 'text-white'} cursor-pointer`} onClick={() => navigate('/rells')} />
        <img src={dataUser?.img_profil} alt="user_profil" className="w-[28px] h-[28px] border-2 rounded-full object-cover cursor-pointer" onClick={() => navigate('/profile')} />
      </div>
    </div>
  )
}