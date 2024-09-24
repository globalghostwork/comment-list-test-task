import { Comment } from "./types";

export const simulateAsyncOperation = <T>(result: T): Promise<T> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(result);
    }, 500);
  });

export const createCommentMok = (value: Comment["body"]): Comment => ({
  body: value,
  id: Math.random(),
});

export const removeCommentMok = (id: Comment["id"]): Comment["id"] => id;
