import React from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { firestore } from "../../lib/firebase";
import { PostContentContainer } from "../../styles/PostItemStyled";
import { getUserWithUsername, postToJSON } from "../../lib/utils/utils";
import { PostContent } from "../../components/PostContent";
import { Post } from "..";

export const getStaticProps = async ({ params }) => {
  const { username, slug } = params;
  const userDoc = await getUserWithUsername(username);

  if (!userDoc) {
    return {
      notFound: true,
    };
  }

  let post;
  let path;

  if (userDoc) {
    const postRef = userDoc.ref.collection("posts").doc(slug);
    post = postToJSON(await postRef.get());

    path = postRef.path;
  }

  return {
    props: {
      post,
      path,
    },
    revalidate: 5000,
  };
};

export const getStaticPaths = async () => {
  const snapshot = await firestore.collectionGroup("posts").get();
  const paths = snapshot.docs.map((doc) => {
    const { username, slug } = doc.data();
    return {
      params: {
        username,
        slug,
      },
    };
  });

  return {
    paths,
    fallback: "blocking",
  };
};

interface IPostPageProps {
  post: Post;
  path: string;
  className: string;
}

 const PostPage: React.FC<IPostPageProps> = (props) => {
  const postRef = firestore.doc(props.path);
  const [realTimePost] = useDocumentData(postRef as any);
  const post = realTimePost || props.post;

  return (
    <PostContentContainer>
      <PostContent post={post} postRef={postRef} />
    </PostContentContainer>
  );
}

export default PostPage;
