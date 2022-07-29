import { UserDisplayName, UserImage, UserName, UserProfileBox } from "../styles/UserProfileStyled";

export const UserProfile = ({ user }) => {
  return (
    <UserProfileBox>
      <UserImage src={user.photoURL}/>
      <UserName>@{user.username}
      </UserName>
      <UserDisplayName>{user.displayName}</UserDisplayName>
    </UserProfileBox>
  );
};
