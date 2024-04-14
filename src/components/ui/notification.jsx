/* eslint-disable react/prop-types */
// /* eslint-disable react/prop-types */
// import { MdVerified, MdCancel } from "react-icons/md";


// export default function Notification({ status, title }) {
//   return (
//     <div className="w-full h-max absolute top-0 flex justify-center items-center p-2 z-[2000]">
//       <div className="py-2 px-4 bg-slate-200 rounded-md text-black shadow-md shadow-slate-400 flex justify-center items-center gap-1">
//         {status == true ? (
//           <MdVerified size={20} className='text-green-500' />
//         ) : (
//           <MdCancel size={20} className='text-red-500' />
//         )}
//         <p className="text-[.9rem] font-medium">{title}</p>
//       </div>
//     </div>
//   )
// }


import { useState, useEffect } from 'react';
import { MdVerified, MdCancel } from "react-icons/md";

const Notification = ({ status, title }) => {
  const [isNotif, setIsNotif] = useState(false);
  const [, setMessageNotif] = useState({
    status: '',
    messages: ''
  });

  const handleNotification = (message, status) => {
    setIsNotif(true);
    setMessageNotif({
      status,
      messages: message
    });

    setTimeout(() => {
      setIsNotif(false);
      setMessageNotif({ status: '', messages: '' });
    }, 2000);
  };

  useEffect(() => {
    if (title && status) {
      handleNotification(title, status);
    }
  }, [status, title]);


  return (
    <div>
      {isNotif && (
        <div className="w-full h-max absolute top-0 flex justify-center items-center p-2 z-[2000] left-0">
          <div className="py-2 px-4 bg-slate-200 rounded-md text-black shadow-md shadow-slate-400 flex justify-center items-center gap-1">
            {status === 'success' ? (
              <>
                <MdVerified size={20} className='text-green-500' />
                <p className="text-[.9rem] font-medium">{title}</p>
              </>
            ) : status === 'error' ? (
              <>
                <MdCancel size={20} className='text-red-500' />
                <p className="text-[.9rem] font-medium">{title}</p>
              </>
            ) : null}
          </div>
        </div>
      )}
    </div>
  )
}

export default Notification;
