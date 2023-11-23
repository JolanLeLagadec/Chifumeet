import { create } from 'zustand'

const useChat = create((set, get) => ({

    isOpen: false,
    setIsOpen: () => set({isOpen: !get().isOpen})

}))

export default useChat