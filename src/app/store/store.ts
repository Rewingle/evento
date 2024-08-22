import {create} from 'zustand'

export const useLocation = create((set)=>({
    country: '',
    city: '',
    setCountry: (country: string)=>{set({country: country})},
    setCity: (city: string)=>set({city: city})
}))