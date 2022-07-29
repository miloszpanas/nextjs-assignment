import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { UserAuthenticated } from "../components/UserAuthenticated";
import { useRouter } from "next/router";
import { Button } from "antd";
import { toast } from "react-hot-toast";
import { SingleCardContainer, CardTitle } from "../styles/PostItemStyled";

export const PostContent = ({ post, postRef }) => {
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
    <SingleCardContainer>
      <CardTitle>{post?.title}</CardTitle>
      <span className="text-sm">
        <>
          Written by{" "}
          <Link href={`/${post.username}/`}>
            <a className="text-info">@{post.username}</a>
          </Link>{" "}
          on {createdAt.toISOString().slice(0, 10)}
        </>
      </span>
      <ReactMarkdown>{post?.content}</ReactMarkdown>
      <UserAuthenticated>
        <Button type="danger" size="large" onClick={deletePost}>
          Delete post
        </Button>
      </UserAuthenticated>
    </SingleCardContainer>
  );
};
