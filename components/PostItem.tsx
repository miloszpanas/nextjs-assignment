import Link from "next/link";
import styled from "styled-components";
import { Button, Card } from "antd";

export const CardContainer = styled.div`
  margin: 2rem 7rem 3rem;
  padding-top: 9rem 10rem;
  min-width: 30vw;
`;

export const DetailsContainer = styled.div`
  margin-top: 1rem;
`;

export const PostItem = ({ post }) => {
  const { Meta } = Card;

  return (
    <CardContainer>
      <Card
        hoverable
        actions={[
          <Link href={`/${post.username}/${post.slug}`}>
            <Button type="primary" size="large">
              Show Post
            </Button>
          </Link>,
        ]}
      >
        <Meta title={post.title} />
        <DetailsContainer>
          <>
            <p>{post.content}</p>
            Written by{" "}
            <Link href={`/${post.username}/`}>
              <a className="text-info">@{post.username}</a>
            </Link>
          </>
        </DetailsContainer>
      </Card>
    </CardContainer>
  );

  // return (
  //   <CardContainer>
  //     <Link href={`/${post.username}`}>
  //       <a>
  //         <strong>By @{post.username}</strong>
  //       </a>
  //     </Link>
  //     <Link href={`/${post.username}/${post.slug}`}>
  //       <CardTitle>{post.title}</CardTitle>
  //     </Link>

  //     <CardFooter>
  //       <span>{wordCount} words.</span>
  //     </CardFooter>
  //   </CardContainer>
  // );
};
