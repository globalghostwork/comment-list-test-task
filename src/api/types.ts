export type Comment = {
  id: number;
  body: string;
  //   postId: number;
  //   likes: number;
  //   user: {
  //     id: number;
  //     username: string;
  //     fullName: string;
  //   };
};

export type CommentListResponse = {
  comments: Comment[];
  //   total: number;
  //   skip: number;
  //   limit: number;
};
