import { useState } from "react"

export default function useNotification() {
  const [status, setStatus] = useState(false)
  const [title, setTitle] = useState(false)

  const handleNotif = (status, title) => {
    setStatus(status)
    setTitle(title)
  }

  return [status, title, handleNotif]

}
