import { create } from 'zustand'

 const useStep = create((set, get) => ({
    step: 0,
    nextStep: () => set({step: get().step + 1}),
    prevStep: () => set({step: get().step - 1})
}))

export default useStep
