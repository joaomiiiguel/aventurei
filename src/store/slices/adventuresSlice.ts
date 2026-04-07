import { PlaceType } from '@/types/Place';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AdventuresState {
  items: PlaceType[];
  loading: boolean;
  error: string | null;
}

const initialState: AdventuresState = {
  items: [],
  loading: false,
  error: null,
};

const adventuresSlice = createSlice({
  name: 'adventures',
  initialState,
  reducers: {
    setAdventures(state, action: PayloadAction<PlaceType[]>) {
      state.items = action.payload;
    },
    setAdventuresLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setAdventuresError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const { setAdventures, setAdventuresLoading, setAdventuresError } = adventuresSlice.actions;
export default adventuresSlice.reducer;
