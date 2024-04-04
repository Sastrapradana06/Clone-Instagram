import { useState } from "react";
import PropTypes from "prop-types";

export default function ReadMore({ text }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    { isExpanded ? setIsExpanded(false) : setIsExpanded(true) }
  };

  const words = text.split(' ');
  const displayText = isExpanded ? text : words.slice(0, 10).join(' ');

  return (
    <>
      {displayText}
      {!isExpanded && words.length > 10 && (
        <button
          className="text-gray-500  text-left"
          onClick={toggleExpanded}
        >
          Lihat Selengkapnya
        </button>
      )}
      {isExpanded && (
        <button
          className="text-gray-500  text-left"
          onClick={toggleExpanded}
        >
          Sembunyikan
        </button>
      )}
    </>
  )
}

ReadMore.propTypes = {
  text: PropTypes.string.isRequired,
};