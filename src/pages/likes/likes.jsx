import { Flex } from "@mantine/core";
import AppShell from "../../components/layout/app-shell";
import { getUserIdByCookies } from "../../store/utils";
import { getPostinganById, getUser } from "../../store/api";
import { useEffect, useState } from "react";

export default function Likes() {
  const [data, setData] = useState([])

  const user_id = getUserIdByCookies()


  const getLoves = async () => {
    const postinganResponse = await getPostinganById(user_id);
    const userResponse = await getUser();
    if (postinganResponse.status && userResponse.status) {
      const postinganData = postinganResponse.data;
      const usersData = userResponse.data;

      const processedData = postinganData.map((postingan) => {
        const result = [];
        postingan.data.love.map((loveId) => {
          if (loveId !== user_id) {
            const filteredUser = usersData.filter(user => user.id === loveId);
            const processedItem = {
              nama_pengguna: filteredUser[0].data.nama_pengguna,
              img_profil: filteredUser[0].data.img_profil,
              img_url: postingan.data.img_url
            };
            result.unshift(processedItem);
          }
        });

        return result;
      });

      const combinedArray = processedData.flat();
      setData(combinedArray);
    }
  }
  useEffect(() => {
    getLoves()
  }, [])

  return (
    <AppShell>
      <div className="min-w-full max-w-max h-max flex flex-col gap-2 items-center py-4">
        <div className="w-[90%]">
          <p className="text-[1rem]">Notifikasi</p>
        </div>
        <div className="w-[90%] h-max  mt-2">
          {data.length > 0 ? (
            data.map((item, i) => (
              <Flex className="w-full mb-4" justify={'space-between'} align={'center'} key={i}>
                <Flex className=" w-[80%]" align={'center'}>
                  <div className="w-[25%]">
                    <img src={item.img_profil} alt="profil" className="w-[50px] h-[50px] rounded-full object-cover" loading="lazy" />
                  </div>
                  <div className="w-[70%] h-max">
                    <p className="text-[.7rem]"><span className="font-semibold">{item.nama_pengguna} </span>menyukai postingan anda</p>

                  </div>
                </Flex>
                <div className="w-max">
                  <img src={item.img_url} alt="profil" className="w-[50px] h-[50px] rounded-md object-cover" loading="lazy" />
                </div>
              </Flex>
            ))
          ) : (
            <p className="text-center text-[.8rem]">Tidak ada notifikasi</p>
          )}
        </div>
      </div>
    </AppShell >

  )
}
