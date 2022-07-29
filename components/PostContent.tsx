import Link from "next/link";
import styled from "styled-components";
import { useRouter } from "next/router";
import { Button, Card } from "antd";
import { toast } from "react-hot-toast";
import { UserAuthenticated } from "./UserAuthenticated";

export const CardContainer = styled.div`
  margin: 10rem 7rem 3rem;
  padding-top: 9rem 10rem;
  min-width: 30vw;
`;

export const DetailsContainer = styled.div`
  margin-top: 1rem;
`;

export const PostContent = ({ post, postRef }) => {
  const { Meta } = Card;

  const router = useRouter();
  const createdAt =
    typeof post?.createdAt === "number"
      ? new Date(post.createdAt)
      : post.createdAt.toDate();

  const deletePost = async () => {
    await postRef.delete();
    router.push("/");
    toast.success("Post has been deleted");
  };

  return (
    <CardContainer>
      <Card
        hoverable
        actions={[
          <UserAuthenticated key={post.username}>
            <Button type="primary" danger size="large" onClick={deletePost}>
              Delete post
            </Button>
          </UserAuthenticated>,
        ]}
      >
        <Meta title={post.content} />
        <DetailsContainer>
          <>
            Written by{" "}
            <Link href={`/${post.username}/`}>
              <a className="text-info">@{post.username}</a>
            </Link>{" "}
            on {createdAt.toISOString().slice(0, 10)}
          </>
        </DetailsContainer>
      </Card>
    </CardContainer>
  );
};
