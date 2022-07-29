import { PostItem } from "./PostItem";

export const PostFeed = ({ posts }) => {
  return posts
    ? posts.map((post) => <PostItem post={post} key={post.slug} />)
    : null;
};
