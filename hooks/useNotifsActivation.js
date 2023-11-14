import { create } from 'zustand'


const useNotifsActivation = create((set, get) => {(
    activated: true,
    setNotifsActivation: () => set({activated: get().!activated})
)})

export default useNotifsActivation