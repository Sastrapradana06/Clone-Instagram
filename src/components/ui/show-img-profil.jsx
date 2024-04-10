import ShowModal from "./modal";

// eslint-disable-next-line react/prop-types
export default function ShowImgProfil({ url, handleCloseModal }) {
  return (
    <ShowModal>
      <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50" onClick={handleCloseModal}>
        <div className="absolute inset-0"></div>

        <div className="w-[90%] h-max flex justify-center items-center">
          <img src={url} alt="user_profile" loading='lazy' className='w-[250px] h-[250px] border-2 rounded-full object-cover' />
        </div>
      </div>
    </ShowModal>
  )
}