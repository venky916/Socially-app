// import { Comment, Like, Post, User } from "@prisma/client";

// // wrong
// type PrismaPost = Post & {
//   author: User;
//   comments: Comment[];
//   likes: Like[];
//   _count: {
//     likes: number;
//     comments: number;
//   };
// };

// 1st api call call for getPosts with select
// type Author = Pick<User, "id" | "name" | "image" | "username">;

// type CommentWithAuthor = Comment & {
//   author: Author;
// };

// type LikeWithUser = Pick<Like, "userId">;

// type PrismaPost = Post & {
//   author: Author;
//   comments: CommentWithAuthor[];
//   likes: LikeWithUser[];
//   _count: {
//     likes: number;
//     comments: number;
//   };
// };

//  2nd api call call for getPosts with include
// type Author = User;

// type CommentWithAuthor = Comment & {
//   author: Author;
// };

// type LikeWithUser = Like;

// type PostCount = {
//   likes: number;
//   comments: number;
// };

// type PostWithDetails = Post & {
//   author: Author;
//   comments: CommentWithAuthor[];
//   likes: LikeWithUser[];
//   _count: PostCount;
// };

// type PostsWithDetails = PostWithDetails[];

// type PrismaPost1 = PostsWithDetails[number];
// type PrismaPost2 = PostWithDetails;
