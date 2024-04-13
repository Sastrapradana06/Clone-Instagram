import { handleLovePostingan } from "../store/api"

export default function useLovePostingan() {
  const handleLove = async (id, user_id, dataPostingan, setDataPostingan) => {
    const data = { id, id_user: user_id }
    const res = await handleLovePostingan(data)
    if (res.status) {
      const newData = dataPostingan.map((item) => {
        if (item.id == res.data.id) {
          return {
            ...item,
            data: {
              ...item.data,
              love: res.data.love
            }
          }
        }

        return item;
      })
      setDataPostingan(newData)
    }
  }

  return [handleLove]
};
