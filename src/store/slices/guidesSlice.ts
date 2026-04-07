import { UserType } from '@/types/User';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GuidesState {
  items: UserType[];
  loading: boolean;
  error: string | null;
}

const initialState: GuidesState = {
  items: [],
  loading: false,
  error: null,
};

const guidesSlice = createSlice({
  name: 'guides',
  initialState,
  reducers: {
    setGuides(state, action: PayloadAction<UserType[]>) {
      state.items = action.payload;
    },
    setGuidesLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setGuidesError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const { setGuides, setGuidesLoading, setGuidesError } = guidesSlice.actions;
export default guidesSlice.reducer;
