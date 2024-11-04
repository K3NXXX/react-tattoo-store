import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FavoritesState {
  favorites: string[];
}

const initialState: FavoritesState = {
  favorites: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setFavorites(state, action: PayloadAction<string[]>) {
      state.favorites = action.payload;
    },
    toggleFavorite(state, action: PayloadAction<string>) {
      const id = action.payload;
      if (state.favorites.includes(id)) {
        state.favorites = state.favorites.filter(favId => favId !== id);
      } else {
        state.favorites.push(id);
      }
    },
    updateFavoritesCount(state, action: PayloadAction<number>) {
      state.favorites = state.favorites.slice(0, action.payload);
    },
  },
});

export const { setFavorites, toggleFavorite, updateFavoritesCount } = favoritesSlice.actions;
export default favoritesSlice.reducer;
