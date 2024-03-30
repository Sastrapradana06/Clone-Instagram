import { useShallow } from 'zustand/react/shallow'
import useAppStore from '../../store/store';
import { useState } from 'react';
import CardStatus from '../../components/ui/card-status';

export default function Status() {
  const [isShowStatus, setIsShowStatus] = useAppStore(
    useShallow((state) => [state.isShowStatus, state.setIsShowStatus])
  )
  const [data, setData] = useState()


  const dataStatus = [
    {
      id: 1,
      nama_pengguna: 'bella_angraini',
      imgProfil: 'https://i.pinimg.com/564x/45/26/3e/45263ead649fb0ae07320a389a39704a.jpg',
      imgStatus: 'https://i.pinimg.com/564x/e4/60/ac/e460acdad0144f89ce1c29af72aaca53.jpg'
    },
    {
      id: 2,
      nama_pengguna: 'raniiii',
      imgProfil: 'https://i.pinimg.com/564x/43/59/7c/43597c5b5688d501867309759638a4b0.jpg',
      imgStatus: 'https://i.pinimg.com/564x/3e/05/35/3e05356875f79bcac20a94c198cbdd8c.jpg'
    },
    {
      id: 3,
      nama_pengguna: 'deva_lesmana',
      imgProfil: 'https://i.pinimg.com/564x/8d/9c/07/8d9c077f1d40870a4814c30fcdf06ce4.jpg',
      imgStatus: 'https://i.pinimg.com/564x/50/6f/d0/506fd0e2425fc38e24012e5af8d24c3f.jpg'
    },
  ]

  const showStatus = (item) => {
    setData(item)
    setIsShowStatus(true)
  }


  return (
    <div className="w-[90%] h-max overflow-x-scroll whitespace-nowrap">
      {isShowStatus && (
        <div className="w-full h-[100vh] fixed left-0 top-0 bg-zinc-800 z-50">
          <CardStatus
            imgProfil={data.imgProfil}
            imgStatus={data.imgStatus}
            username={data.nama_pengguna}
          />
        </div>
      )}
      <div className="w-[70px] h-[70px] rounded-full border-2 inline-block mr-4">
        <img src="https://i.pinimg.com/564x/c0/18/31/c0183163ba468401a02ae53b2665daa1.jpg" alt="img" className="w-full h-full rounded-full" />
      </div>
      {dataStatus ? (
        dataStatus.map((item) => {
          return (
            <div className="w-[70px] h-[70px] rounded-full border-2 border-pink-600 inline-block mr-4 cursor-pointer" key={item.id} onClick={() => showStatus(item)}>
              <img src={item.imgProfil} alt="img" className="w-full h-full rounded-full object-cover" />
            </div>
          )
        })
      ) : null}
    </div>
  )
}