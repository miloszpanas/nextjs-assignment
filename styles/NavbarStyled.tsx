import styled from "styled-components";

export const NavbarContainer = styled.nav`
  height: 70px;
  width: 100%;
  background: white;
  color: ${(props) => props.theme.colors.black};
  position: fixed;
  top: 0;
  padding: 0 10vw;
  font-weight: bold;
  border-bottom: 2px solid #b5bdc4;
  z-index: 99;
`;

export const NavbarLogo = styled.button`
  &:hover {
    filter: brightness(90%);
  }
  background-color: ${(props) => props.theme.colors.black};
  color: white;
  text-transform: uppercase;
  font-size: 1rem;
  padding: 0.8rem 2rem;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  text-decoration: none;
  font-family: "Noto Sans", sans-serif;
  font-weight: bold;
  border-radius: 0.25rem;
  cursor: pointer;
  margin: 7px;
`;

export const NavbarItem = styled.li`
  list-style-type: none;
  display: inline-block;
  margin-right: .7rem;
`;

export const NewPostButton = styled.button`
  &:hover {
    filter: brightness(90%);
  }
  background-color: ${(props) => props.theme.colors.blue};
  color: ${(props) => props.theme.colors.white};
  ${NavbarLogo}

  text-transform: uppercase;
  font-size: 1rem;
  padding: 0.8rem 2rem;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  text-decoration: none;
  font-family: "Noto Sans", sans-serif;
  font-weight: bold;
  border-radius: 0.25rem;
  cursor: pointer;
  margin: 3px;
`;

export const GoogleButton = styled.button`
  background-color: white;
  color: ${(props) => props.theme.colors.black};

  text-transform: uppercase;
  font-size: 1rem;
  padding: 0.8rem 2rem;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  text-decoration: none;
  font-family: "Noto Sans", sans-serif;
  font-weight: bold;
  border-radius: 0.25rem;
  cursor: pointer;
  margin: 3px;
  border: none;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
`;

export const GoogleImage = styled.img`
  src: url(${(props) => props.src});
  width: 30px;
  margin-right: 10px;
`

export const SignInButton = styled.button`
  &:hover {
    filter: brightness(90%);
  }

  background-color: ${(props) => props.theme.colors.green};
  color: ${(props) => props.theme.colors.white};
  font-size: 1rem;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  text-decoration: none;
  font-family: "Noto Sans", sans-serif;
  font-weight: bold;
  border-radius: 0.25rem;
  cursor: pointer;
  margin: 6px;
  border: none;
`;

export const SignOutButton = styled.button`
  &:hover {
    filter: brightness(90%);
  }

  background-color: ${(props) => props.theme.colors.red};
  color: ${(props) => props.theme.colors.white};
  font-size: 1rem;
  padding: 0.8rem 2rem;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  text-decoration: none;
  font-family: "Noto Sans", sans-serif;
  font-weight: bold;
  border-radius: 0.25rem;
  cursor: pointer;
  margin: 3px;
`;

export const NavbarList = styled.ul`
  margin: 0;
  WIDTH: 100%;
  display: flex;
  justify-content: space-between;
`;

export const LogoContainer = styled.div`
margin-top: 4px;
`;
export const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const Image = styled.img`
  border-radius: 50%;
`;
