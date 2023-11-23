import { create } from 'zustand'


const useChallenge = create((set) => ({
    ids: [],
    isExisting: null,
    setIdUserChallenged: (id) => set((state) => ({ids: [...state.ids, id]})),
    setIsExisting: (exist) => set({isExisting: exist})
}))

export default useChallenge