import { create } from 'zustand'
import { getUserLogin } from './api';

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


}))

export default useAppStore