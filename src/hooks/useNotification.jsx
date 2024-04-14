import { useState } from "react"

export default function useNotification() {
  const [status, setStatus] = useState('')
  const [title, setTitle] = useState('')

  const handleNotif = (status, title) => {
    setStatus(status)
    setTitle(title)


    setTimeout(() => {
      setStatus('')
      setTitle('')
    }, 2000);
  }


  return [status, title, handleNotif]

}
