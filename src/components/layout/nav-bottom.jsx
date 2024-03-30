import { RiHome3Fill } from "react-icons/ri";
import { FaRegUserCircle, FaRegPlusSquare } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { BiSolidVideos } from "react-icons/bi";
import { useLocation, useNavigate } from 'react-router-dom';


export default function NavBottom() {
  const { pathname } = useLocation();
  const navigate = useNavigate()

  return (
    <div className="fixed bottom-0 bg-zinc-950 w-full h-max z-40">
      <div className="w-[90%] h-[50px]  m-auto flex items-center justify-between">
        <RiHome3Fill size={25} className={`${pathname == '/home' ? 'text-pink-700 ' : 'text-white'} cursor-pointer`} onClick={() => navigate('/home')} />
        <IoSearch size={25} className={`${pathname == '/search' ? 'text-pink-700 ' : 'text-white'} cursor-pointer`} onClick={() => navigate('/search')} />
        <FaRegPlusSquare size={25} className={`${pathname == '/rels' ? 'text-pink-700 ' : 'text-white'} cursor-pointer`} onClick={() => navigate('/create-postingan')} />
        <BiSolidVideos size={25} className={`${pathname == '/rells' ? 'text-pink-700 ' : 'text-white'} cursor-pointer`} onClick={() => navigate('/rells')} />
        <FaRegUserCircle size={25} className={`${pathname == '/profile' ? 'text-pink-700 ' : 'text-white'} cursor-pointer`} onClick={() => navigate('/profile')} />
      </div>
    </div>
  )
}