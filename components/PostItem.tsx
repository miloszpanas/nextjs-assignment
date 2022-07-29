import Link from "next/link";
import styled from "styled-components";
import { CardFooter, CardTitle } from "../styles/PostItemStyled";

export const PostItem = ({ post }) => {
  const wordCount = post?.content.trim().split(/\s+/g).length;

  const CardContainer = styled.div`
    padding: 2rem;
    margin: 1rem 0;
    background-color: #ffffff;
    border: 4px solid ${(props) => props.theme.colors.gray};
    border-radius: 8px;
    box-shadow: 8px 8px 24px -17px rgba(66, 68, 90, 1);
  `;

  return (
    <CardContainer>
      <Link href={`/${post.username}`}>
        <a>
          <strong>By @{post.username}</strong>
        </a>
      </Link>
      <Link href={`/${post.username}/${post.slug}`}>
        <CardTitle>{post.title}</CardTitle>
      </Link>

      <CardFooter>
        <span>{wordCount} words.</span>
      </CardFooter>
    </CardContainer>
  );
};
