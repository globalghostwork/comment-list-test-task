import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store/store";
import {
  fetchComments,
  createComment,
  removeComment,
} from "./store/commentSlice";
import {
  setScrollPosition,
  setCommentInputValue,
} from "./store/commentsPageSlice";
import { isFulfilled } from "@reduxjs/toolkit";

const buttonStyles = { cursor: "pointer", background: "none", border: "none" };

function App() {
  const dispatch: AppDispatch = useDispatch();
  const { comments, loading, error } = useSelector(
    (state: RootState) => state.comments,
  );
  const { commentInputValue, scrollPosition } = useSelector(
    (state: RootState) => state.commentsPage,
  );

  const handleScroll = useCallback(() => {
    dispatch(setScrollPosition({ x: window.scrollX, y: window.scrollY }));
  }, [dispatch]);

  const handleChangeCommentInputValue = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setCommentInputValue(e.target.value));
    },
    [dispatch],
  );

  const handleCreateComment = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      const action = await dispatch(createComment(commentInputValue));
      if (isFulfilled(action)) {
        dispatch(setCommentInputValue(""));
      }
    },
    [commentInputValue, dispatch],
  );

  const handleRemoveComment = useCallback(
    (id: number) => dispatch(removeComment(id)),
    [dispatch],
  );

  useEffect(() => {
    if (!comments?.length) {
      dispatch(fetchComments());
    }
  }, [dispatch, comments]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    if (comments.length) {
      window.scroll(scrollPosition.x, scrollPosition.y);
    }
  }, [comments.length, scrollPosition]);

  return (
    <>
      <h1>Comment List</h1>
      <form>
        <input
          placeholder="New comment"
          value={commentInputValue}
          onChange={handleChangeCommentInputValue}
        />
        <button
          type="submit"
          onClick={handleCreateComment}
          style={buttonStyles}
        >
          ➤
        </button>
      </form>
      {loading && "loading..."}
      {error}
      {Boolean(comments.length) &&
        comments.map(({ body, id }) => (
          <div style={{ display: "flex" }} key={id}>
            <p>{body}</p>
            <button
              style={buttonStyles}
              onClick={() => handleRemoveComment(id)}
            >
              ❌
            </button>
          </div>
        ))}
    </>
  );
}

export default App;
