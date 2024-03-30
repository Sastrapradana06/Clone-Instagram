import { Flex } from '@mantine/core';
import { useNavigate } from 'react-router-dom';


export default function Content() {
  const navigate = useNavigate()

  const dataPostinagnUser = [
    {
      id: 1,
      profileImageUrl: 'https://i.pinimg.com/736x/29/49/08/294908e996a331d66b7c0366355f429b.jpg',
      namaPengguna: 'faraadthya',
      likes: '91.817',
      imgUrl: 'https://i.pinimg.com/736x/29/49/08/294908e996a331d66b7c0366355f429b.jpg'
    },
    {
      id: 2,
      profileImageUrl: 'https://i.pinimg.com/564x/0f/9f/b9/0f9fb99e67dbdfd19abec7a353a4fd74.jpg',
      namaPengguna: 'adindaygke_2',
      likes: '70.715',
      imgUrl: 'https://i.pinimg.com/564x/0f/9f/b9/0f9fb99e67dbdfd19abec7a353a4fd74.jpg'
    },
    {
      id: 3,
      profileImageUrl: 'https://i.pinimg.com/564x/74/7e/04/747e043ae355a120f966774814da320d.jpg',
      namaPengguna: 'fachriii_',
      likes: '12.453',
      imgUrl: 'https://i.pinimg.com/564x/74/7e/04/747e043ae355a120f966774814da320d.jpg'
    },
    {
      id: 4,
      profileImageUrl: '/pp2.jfif',
      namaPengguna: 'queen',
      likes: '170rb',
      imgUrl: 'https://i.pinimg.com/564x/16/34/8f/16348fd75928e7c3359de933a717b1d8.jpg'
    },
    {
      id: 5,
      profileImageUrl: 'https://i.pinimg.com/564x/b1/e0/32/b1e032824f5adb73c046ea0f15959d93.jpg',
      namaPengguna: 'rahmaaa96',
      likes: '200.456 rb',
      imgUrl: 'https://i.pinimg.com/564x/b1/e0/32/b1e032824f5adb73c046ea0f15959d93.jpg'
    },
    {
      id: 6,
      profileImageUrl: 'https://i.pinimg.com/564x/2e/0d/dd/2e0ddd5a018facd7aca4f44ea542094c.jpg',
      namaPengguna: 'thafanyads',
      likes: '57.177',
      imgUrl: 'https://i.pinimg.com/564x/2e/0d/dd/2e0ddd5a018facd7aca4f44ea542094c.jpg'
    },
    {
      id: 7,
      profileImageUrl: 'https://i.pinimg.com/564x/3a/1d/83/3a1d83b79a98bf4c38145b13eff8f714.jpg',
      namaPengguna: 'virasoto',
      likes: '37.247',
      imgUrl: 'https://i.pinimg.com/564x/3a/1d/83/3a1d83b79a98bf4c38145b13eff8f714.jpg'
    },
    {
      id: 8,
      profileImageUrl: 'https://i.pinimg.com/564x/48/3a/19/483a19388508518e0e0debb94d899cb9.jpg',
      namaPengguna: 'siskaamera',
      likes: '11.367',
      imgUrl: 'https://i.pinimg.com/564x/48/3a/19/483a19388508518e0e0debb94d899cb9.jpg'
    },
    {
      id: 9,
      profileImageUrl: 'https://i.pinimg.com/564x/42/2c/0c/422c0cbd1f6302a478abff0410d54d0e.jpg',
      namaPengguna: '_s0ursally',
      likes: '77.290',
      imgUrl: 'https://i.pinimg.com/564x/42/2c/0c/422c0cbd1f6302a478abff0410d54d0e.jpg'
    },
    {
      id: 10,
      profileImageUrl: 'https://i.pinimg.com/736x/e4/67/f4/e467f41c6f6d5c632bbe0851f8dc6aca.jpg',
      namaPengguna: 'maherr12',
      likes: '50.123',
      imgUrl: 'https://i.pinimg.com/736x/e4/67/f4/e467f41c6f6d5c632bbe0851f8dc6aca.jpg'
    },
    {
      id: 11,
      profileImageUrl: 'https://i.pinimg.com/564x/0c/85/26/0c8526922ce5c71841050a7af9c1b50b.jpg',
      namaPengguna: 'yahya_z',
      likes: '9.967',
      imgUrl: 'https://i.pinimg.com/564x/0c/85/26/0c8526922ce5c71841050a7af9c1b50b.jpg'
    },
    {
      id: 12,
      profileImageUrl: 'https://i.pinimg.com/736x/26/fb/1c/26fb1c079ec7f0afc92e5ee2af551726.jpg',
      namaPengguna: 'ade_emilia6',
      likes: '18.777',
      imgUrl: 'https://i.pinimg.com/736x/26/fb/1c/26fb1c079ec7f0afc92e5ee2af551726.jpg'
    },
  ]

  return (
    <Flex className="w-full h-max m-auto  mt-2 mb-[60px]" wrap={'wrap'} justify={''}>
      {dataPostinagnUser ? (
        dataPostinagnUser.map((item, i) => {
          return (
            <div className="w-[33%] h-[150px] mt-1 cursor-pointer" key={i} onClick={() => navigate(`/search/postingan/${item.id}`)}>
              <img src={item.imgUrl} alt="status" className="w-full h-full object-cover" />
            </div>
          )
        })
      ) : null}

    </Flex>
  )
}