import { useState, useEffect } from 'react';
import { AiOutlineMessage } from "react-icons/ai";
import { FiHeart } from "react-icons/fi";

export default function NavHome() {
  const [isFixed, setIsFixed] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;

      if (currentScrollPos == 0) {
        setIsFixed(false);
      } else if (currentScrollPos > prevScrollPos) {
        setIsFixed(false);
      } else {
        setIsFixed(true);
      }

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);


  return (
    <div className={`w-[100%] h-[50px] flex justify-between items-center px-4 ${isFixed ? 'fixed top-0 bg-black px-4' : ''}`}>
      <h1 style={{ fontFamily: 'Satisfy', fontWeight: 400 }} className="text-[1.5rem]">Instagram</h1>
      <div className="flex gap-4 w-max">
        <FiHeart size={20} className="text-white cursor-pointer" />
        <AiOutlineMessage size={20} className="text-white cursor-pointer" />
      </div>
    </div>
  );
}
