import { handlebookmarkPostingan } from "../store/api"

export default function useBookmark() {

  const handleBookmark = async (id, user_id, dataPostingan, setDataPostingan) => {
    const data = { id, id_user: user_id }
    const res = await handlebookmarkPostingan(data)
    if (res.status) {
      const newData = dataPostingan.map((item) => {
        if (item.id == res.data.id) {
          return {
            ...item,
            data: {
              ...item.data,
              bookmark: res.data.bookmark
            }
          }
        }

        return item;
      })
      setDataPostingan(newData)
    }
  }

  return [handleBookmark]
}
