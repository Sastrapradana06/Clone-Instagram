import NavLink from "../../components/ui/nav-link";
import { Flex, Button } from "@mantine/core";
import { useRef, useState } from 'react';

export default function CreatePostingan() {
  const [urlImgStatus, setUrlImgStatus] = useState()
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = URL.createObjectURL(e.target.files[0]);
    setUrlImgStatus(file)
  }
  console.log({ urlImgStatus });

  return (
    <div className="w-full min-h-[100vh] max-h-max bg-zinc-800 text-white flex justify-center items-center flex-col">
      <NavLink title={'Buat Postingan'} url={'/home'} />
      <Flex className="w-full h-max m-auto pt-20 pb-5" direction={'column'} gap={'md'} align={'center'}>
        <Flex className="w-full h-max  text-white" direction={'column'} align={'center'} gap={'sm'}>
          {urlImgStatus ? (
            <img src={urlImgStatus} alt="user" className="w-[90%] h-[400px]  border object-cover" />
          ) : null}
          <Button variant="light" color="pink" onClick={handleClick}>{urlImgStatus ? 'Ganti Foto' : 'Upload foto'}</Button>
          <input
            type="file"
            id="file-input"
            className="file-input hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
        </Flex>

        <form className="w-[90%] h-max flex gap-4 flex-col">
          <Flex className="w-full h-max" direction={'column'}>
            <label htmlFor="nama" className="text-[.8rem] text-zinc-400">Deskripsi Status</label>
            <textarea className="w-full bg-transparent border-b outline-none h-[100px]" />
          </Flex>

          <div className="w-full">
            <Button variant="light" color="indigo">Posting</Button>
          </div>
        </form>
      </Flex>
    </div>
  )
}