import { useShallow } from 'zustand/react/shallow'
import useAppStore from '../../store/store';
import { useEffect, useState } from 'react';
import CardStatus from '../../components/ui/card-status';
import { getAllStatus } from '../../services/useApi';

export default function Status() {
  const [isShowStatus, setIsShowStatus, dataUser, userStatus] = useAppStore(
    useShallow((state) => [state.isShowStatus, state.setIsShowStatus, state.dataUser, state.userStatus])
  )
  const [idStatus, setIdStatus] = useState()
  const [dataStatus, setDataStatus] = useState([])
  const [data, setData] = useState([])

  // const dataStatus = [
  //   {
  //     id: 1,
  //     nama_pengguna: 'bella_angraini',
  //     imgProfil: 'https://i.pinimg.com/564x/45/26/3e/45263ead649fb0ae07320a389a39704a.jpg',
  //     imgStatus: 'https://i.pinimg.com/564x/e4/60/ac/e460acdad0144f89ce1c29af72aaca53.jpg'
  //   },
  //   {
  //     id: 2,
  //     nama_pengguna: 'raniiii',
  //     imgProfil: 'https://i.pinimg.com/564x/43/59/7c/43597c5b5688d501867309759638a4b0.jpg',
  //     imgStatus: 'https://i.pinimg.com/564x/3e/05/35/3e05356875f79bcac20a94c198cbdd8c.jpg'
  //   },
  //   {
  //     id: 3,
  //     nama_pengguna: 'deva_lesmana',
  //     imgProfil: 'https://i.pinimg.com/564x/8d/9c/07/8d9c077f1d40870a4814c30fcdf06ce4.jpg',
  //     imgStatus: 'https://i.pinimg.com/564x/50/6f/d0/506fd0e2425fc38e24012e5af8d24c3f.jpg'
  //   },
  // ]

  const showStatus = (data, type) => {
    // setIdStatus(id)
    setIsShowStatus(true)
    if (type == 'user') {
      setData(userStatus)
    } else {
      setData(data)
    }
  }

  const getStatus = async () => {
    const res = await getAllStatus()
    if (res.status) {
      const getStatusMengikuti = res.data.filter(item => dataUser?.mengikuti.includes(item.data.user_id))
      const groupedData = getStatusMengikuti.reduce((acc, obj) => {
        const key = obj.data.user_id;
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(obj);
        return acc;
      }, {});

      const groupedArray = Object.values(groupedData);
      setDataStatus(groupedArray)
    }
  }


  useEffect(() => {
    getStatus()
  }, [])

  return (
    <div className="w-[90%] h-max overflow-x-scroll whitespace-nowrap pt-[60px]">
      {isShowStatus && (
        <div className="w-full h-[100vh] fixed left-0 top-0 bg-zinc-800 z-50">
          <CardStatus
            data={data}
            id={idStatus}
          />
        </div>
      )}
      {userStatus && userStatus.length > 0 ? (
        <div className="w-[70px] h-[70px] rounded-full border-2 inline-block mr-4 cursor-pointer" onClick={() => showStatus(undefined, 'user')}>
          <img src={dataUser?.img_profil} alt="img" className="w-full h-full rounded-full object-cover" />
        </div>
      ) : (
        <div className="w-[70px] h-[70px] rounded-full  inline-block mr-4">
          <img src={dataUser?.img_profil} alt="img" className="w-full h-full rounded-full object-cover" />
        </div>
      )}
      {dataStatus ? (
        dataStatus.map((item) => {
          return (
            <div className="w-[70px] h-[70px] rounded-full border-2 border-pink-600 inline-block mr-4 cursor-pointer" key={item[0].id} onClick={() => showStatus(item, 'following')}>
              <img src={item[0].data.img_profil} alt="img" className="w-full h-full rounded-full object-cover" />
            </div>
          )
        })
      ) : null}
    </div>
  )
}