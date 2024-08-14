import { create } from 'zustand'

export const useSearchStore = create((set) => ({
  query: '',
  setQuery: (newQuery:any) => set({ query: newQuery }),
}))