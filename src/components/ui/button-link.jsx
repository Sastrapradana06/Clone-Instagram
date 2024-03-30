import { useNavigate } from "react-router-dom"
import PropTypes from "prop-types";


export default function ButtonLink({ style, url, title }) {
  const navigate = useNavigate()
  return (
    <button className={`${style}`} onClick={() => navigate(`${url}`)}>{title}</button>
  )
}

ButtonLink.propTypes = {
  style: PropTypes.string,
  url: PropTypes.string,
  title: PropTypes.string,
};