import { createSlice } from "@reduxjs/toolkit";

interface SettingsState {
    showRating: boolean;
}

const initialState: SettingsState = {
    showRating: true,
};

export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setShowRatings: (state, action) => {
            state.showRating = action.payload;
        },
    },
});

export const { setShowRatings } = settingsSlice.actions;
export default settingsSlice.reducer;