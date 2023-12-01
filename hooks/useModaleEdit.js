import { create } from 'zustand'

const useEditModale = create((set, get) => ({
    
    isOpen: false,
    setIsOpen: () => set(() => ({isOpen: !get().isOpen }))

}))

export default useEditModale