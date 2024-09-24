import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { CommentListResponse, Comment } from "../api/types";
import {
  createCommentMok,
  removeCommentMok,
  simulateAsyncOperation,
} from "../api/moks";

export type CommentsState = {
  comments: Comment[];
  loading: boolean;
  error: string | null;
};

const initialState: CommentsState = {
  comments: [],
  loading: false,
  error: null,
};

export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("https://dummyjson.com/comments");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data: CommentListResponse = await response.json();
      return data;
    } catch (err) {
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      }
    }
  },
);

export const createComment = createAsyncThunk(
  "comments/createComment",
  async (payload: string, { rejectWithValue }) => {
    try {
      const data = await simulateAsyncOperation(createCommentMok(payload));
      return data;
    } catch (err) {
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      }
    }
  },
);

export const removeComment = createAsyncThunk(
  "comments/removeComment",
  async (commentId: Comment["id"], { rejectWithValue }) => {
    try {
      const data = await simulateAsyncOperation(removeCommentMok(commentId));
      return data;
    } catch (err) {
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      }
    }
  },
);

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchComments.fulfilled,
        (state, action: PayloadAction<CommentListResponse | undefined>) => {
          state.loading = false;
          state.comments = action.payload?.comments ?? [];
        },
      )
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string | null;
      })

      .addCase(
        createComment.fulfilled,
        (state, action: PayloadAction<Comment | undefined>) => {
          if (action.payload) {
            state.comments.unshift(action.payload);
          }
        },
      )

      .addCase(
        removeComment.fulfilled,
        (state, action: PayloadAction<number | undefined>) => {
          if (action.payload) {
            state.comments = state.comments.filter(
              (comment) => comment.id !== action.payload,
            );
          }
        },
      );
  },
});

export default commentsSlice.reducer;
