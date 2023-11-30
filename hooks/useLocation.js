import { create } from 'zustand'

const useLocation = create((set) => ({
    latitude: null,
    longitude: null,
    setLocation: (lat, long) => {
        set({
            latitude: lat,
            longitude: long
        })
    }
}))

export default useLocation;