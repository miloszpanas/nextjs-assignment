import { useState } from "react";
import { Spin } from "antd";
import { PostFeed } from "../components/PostList";
import { Button } from "antd";
import { firestore, fromMillis } from "../lib/firebase";
import { postToJSON } from "../lib/utils/utils";
import { AppContainer } from "../styles/ContainerStyled";

export interface Post {
  content: string;
  createdAt: number;
  published: boolean;
  slug: string;
  title: string;
  uid: string;
  username: string;
  updatedAt: number;
}

interface IHomeProps {
  posts: Post[];
  className?: string;
}

const PostLimit = 10;

export async function getServerSideProps(context) {
  const postsQuery = firestore
    .collectionGroup("posts")
    .where("published", "==", true)
    .orderBy("createdAt", "desc")
    .limit(PostLimit);

  const posts = (await postsQuery.get()).docs.map(postToJSON);

  return {
    props: { posts }
  };
}

const Home: React.FC<IHomeProps> = (props) => {
  const [posts, setPosts] = useState<Post[]>(props.posts);
  const [loading, setLoading] = useState<boolean>(false);
  const [postsEnd, setPostsEnd] = useState<boolean>(false);

  // Get next page in pagination query
  const getMorePosts = async () => {
    setLoading(true);
    const last = posts[posts.length - 1];

    const cursor =
      typeof last.createdAt === "number"
        ? fromMillis(last.createdAt)
        : last.createdAt;

    const query = firestore
      .collectionGroup("posts")
      .where("published", "==", true)
      .orderBy("createdAt", "desc")
      .startAfter(cursor)
      .limit(PostLimit);

    const newPosts = (await query.get()).docs.map((doc) => doc.data());

    setPosts(posts.concat(newPosts as Post[]));
    setLoading(false);

    if (newPosts.length < PostLimit) {
      setPostsEnd(true);
    }
  };

  return (
    <AppContainer>
      <PostFeed posts={posts} />
      {!loading && !postsEnd && (
        <Button type="primary" size="large" onClick={getMorePosts}>
          Load more
        </Button>
      )}
      {loading && <Spin size="large" />}
      {postsEnd && "No more posts to load"}
    </AppContainer>
  );
};

export default Home;
