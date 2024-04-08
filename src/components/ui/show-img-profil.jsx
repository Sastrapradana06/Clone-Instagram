import ShowModal from "./modal";

// eslint-disable-next-line react/prop-types
export default function ShowImgProfil({ url, handleCloseModal }) {
  return (
    <ShowModal>
      <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50" onClick={handleCloseModal}>
        <div className="absolute inset-0"></div>

        <div className="w-[90%] h-[200px] flex justify-center items-center">
          <img src={url} alt="user_profile" loading='lazy' className='w-[200px] h-[200px] border-2 rounded-full object-cover' />
        </div>
      </div>
    </ShowModal>
  )
}