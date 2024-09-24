import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type State = {
  scrollPosition: { x: number; y: number };
  commentInputValue: string;
};

const initialState: State = {
  scrollPosition: { x: 0, y: 0 },
  commentInputValue: "",
};

const commentsPageSlice = createSlice({
  name: "commentsPage",
  initialState,
  reducers: {
    setScrollPosition(state, action: PayloadAction<State["scrollPosition"]>) {
      state.scrollPosition = action.payload;
    },
    setCommentInputValue(
      state,
      action: PayloadAction<State["commentInputValue"]>,
    ) {
      state.commentInputValue = action.payload;
    },
  },
});

export const { setScrollPosition, setCommentInputValue } =
  commentsPageSlice.actions;
export default commentsPageSlice.reducer;
