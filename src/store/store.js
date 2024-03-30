import { create } from 'zustand'

const useAppStore = create((set) => ({

  isShowStatus: false,
  // setIsShowStatus: () => set((state) => ({ isShowStatus: state.isShowStatus === false ? true : false })),
  setIsShowStatus : (data) => set({ isShowStatus: data }),

  dataUser : {
    username: 'zoe sean',
    nama_pengguna: 'sean_',
    imgProfil: 'https://i.pinimg.com/564x/c0/18/31/c0183163ba468401a02ae53b2665daa1.jpg',
    bio: 'software engineer',
    tautan: 'me.com',
    pengikut: 71000,
    mengikuti: 160,
  },
  updateDataUser : (data) => set({dataUser: data})


}))

export default useAppStore