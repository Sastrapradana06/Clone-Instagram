import { create } from 'zustand'
import { getPostinganById, getUserLogin } from './api';
import { getCookies } from './utils';


const useAppStore = create((set) => ({

  isShowStatus: false,
  // setIsShowStatus: () => set((state) => ({ isShowStatus: state.isShowStatus === false ? true : false })),
  setIsShowStatus : (data) => set({ isShowStatus: data }),

  dataUser : undefined,
  updateDataUser : (data) => set({dataUser: data}),
  getUser: async () => {
    try {
      const res = await getUserLogin()
      if(res.status) {
        set({dataUser: res.data})
      }
    } catch (error) {
      console.log(error);
    }
  },

  userPostingan : undefined,
  updateUserPostingan : (data) => set({userPostingan: data}),
  getUserPostingan: async () => {
    try {
      const dataByCookies = getCookies('user_data')
      const {id} = JSON.parse(dataByCookies)
      const res = await getPostinganById(id)
      if(res.status) {
        set({userPostingan: res.data})
      }
    } catch (error) {
      console.log(error);
    }
  },

  resetState : () => set({dataUser: undefined, userPostingan:undefined}),


}))

export default useAppStore