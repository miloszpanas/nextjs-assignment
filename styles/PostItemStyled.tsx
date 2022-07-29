import styled from "styled-components";

export const CardContainer = styled.div`
  padding: 2rem;
  margin: 1rem 0;
  background-color: white;
  border: 1px solid ${(props) => props.theme.colors.gray};
  border-radius: 8px;
`;

export const CardTitle = styled.h1`
  cursor: pointer;
`;

export const CardFooter = styled.footer`
  display: flex;
`;

export const PostContentContainer = styled.div`
  margin: 0 10rem;
`;

export const SingleCardContainer = styled.div`
padding: 2rem;
  margin: 10rem 0;
  background-color: white;
  border: 1px solid ${(props) => props.theme.colors.gray};
  border-radius: 8px;
`
