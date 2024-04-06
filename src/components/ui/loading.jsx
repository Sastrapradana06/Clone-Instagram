import { FaSpinner } from "react-icons/fa";
import ShowModal from "./modal";


export default function Loading() {
  return (
    <ShowModal>
      <button type="button" className="bg-sky-600 flex items-center gap-2 p-3 rounded-lg" disabled>
        <FaSpinner className="animate-spin" />
        Loading...
      </button>
    </ShowModal>
  )
}