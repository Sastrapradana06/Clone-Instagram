import { useState } from "react";
import { handleIkutiUser } from "../store/api";
import useAppStore from "../store/store";
import { useShallow } from "zustand/react/shallow";

export default function useIkutiPengguna() {
  const [isLoading, setIsLoading] = useState(false)

  const [getUser] = useAppStore(
    useShallow((state) => [state.getUser])
  )

  const ikutiPengguna = async (id_pengguna, user_id, setDataPengguna) => {
    setIsLoading(true)
    const data = {
      id_pengguna,
      id_user: user_id
    }

    if (Object.keys(data).length > 0) {
      const res = await handleIkutiUser(data)
      if (res.status) {
        setDataPengguna(prev => ({
          ...prev,
          data: {
            ...prev.data,
            pengikut: res.data.pengikut
          }
        }))
        getUser()
      }
    }
    setIsLoading(false)
  }

  return [ikutiPengguna, isLoading]

};
