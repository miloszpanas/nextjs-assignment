import { getUserWithUsername, postToJSON } from "../../lib/utils/utils";
import { UserAuthenticated } from "../../components/UserAuthenticated";
import { UserProfile } from "../../components/UserProfile";
import { PostFeed } from "../../components/PostList";
import styled from "styled-components";
import { Post } from "..";

interface IUser {
  displayName: string;
  username: string;
  displayImage: string;
}

export async function getServerSideProps({ query }) {
  const { username } = query;

  const userDoc = await getUserWithUsername(username);

  if (!userDoc) {
    return {
      notFound: true,
    };
  }

  let user = null;
  let posts = null;

  if (userDoc) {
    user = userDoc.data();
    const postsQuery = userDoc.ref
      .collection("posts")
      .where("published", "==", true)
      .orderBy("createdAt", "desc")
      .limit(5);
    posts = (await postsQuery.get()).docs.map(postToJSON);
  }

  return {
    props: { user, posts }
  };
}

const UserContainer = styled.div`
  width: 50%;
  margin: 0 auto;
`;

const UserProfilePage: React.FC<{ user: IUser; posts: Post[] }> = ({
  user,
  posts,
}): JSX.Element => {
  return (
    <UserContainer>
      <UserProfile user={user} />
      <PostFeed posts={posts} />
    </UserContainer>
  );
};

export default UserProfilePage;
