// import { useState, useEffect } from 'react';
import { AiOutlineMessage } from "react-icons/ai";
import { FiHeart } from "react-icons/fi";
import { Indicator, Avatar } from '@mantine/core';
import { useNavigate } from "react-router-dom";

export default function NavHome() {

  const navigate = useNavigate()

  return (
    <div className={`w-[100%] h-[50px] flex justify-between items-center px-4 fixed top-0 bg-zinc-900`}>
      <h1 style={{ fontFamily: 'Satisfy', fontWeight: 400 }} className="text-[1.5rem]">Snapvibes</h1>
      <div className="flex gap-4 w-max">
        <Indicator color="pink" size={6} processing >
          <FiHeart size={20} className="text-white cursor-pointer" onClick={() => navigate('/likes-me')} />
        </Indicator>
        {/* <AiOutlineMessage size={20} className="text-white cursor-pointer" /> */}
      </div>
    </div>
  );
}
