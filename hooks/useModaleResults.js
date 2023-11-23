import { create } from 'zustand'

const useModaleResults = create((set, get) => ({
    isOpen: false,
    setIsOpen: () => set({isOpen: !get().isOpen})
}))

export default useModaleResults