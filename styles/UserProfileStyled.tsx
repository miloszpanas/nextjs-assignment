import styled from "styled-components";

export const UserProfileBox = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  text-align: center;
  margin-top: 10rem;
`;

export const UserImage = styled.img`
  src: url(${(props) => props.src});
  width: 20%;
  display: block;
  margin: auto;
  border-radius: 50%;
  max-width: 150px;
`;

export const UserName = styled.p``;
export const UserDisplayName = styled.h1``;

// create styled component for img with src and alt
