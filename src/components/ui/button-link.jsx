import { useNavigate } from "react-router-dom"


// eslint-disable-next-line react/prop-types
export default function ButtonLink({ style, url, title }) {
  const navigate = useNavigate()
  return (
    <button className={`${style}`} onClick={() => navigate(`${url}`)}>{title}</button>
  )
}
