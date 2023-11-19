import { create } from 'zustand'

const useSidebar = create((set, get) => ({
    isOpen: false,
    setIsOpen: () => set({isOpen: !get().isOpen})
}))

export default useSidebar