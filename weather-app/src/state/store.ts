import create from 'zustand';

interface Store {
  favorites: string[];
  addFavorite: (city: string) => void;
  removeFavorite: (city: string) => void;
}

const useStore = create<Store>((set) => ({
  favorites: [],
  addFavorite: (city) => set((state) => ({ favorites: [...state.favorites, city] })),
  removeFavorite: (city) => set((state) => ({ favorites: state.favorites.filter((c) => c !== city) }))
}));

export default useStore;