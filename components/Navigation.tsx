import Link from "next/link";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useContext } from "react";
import { UserContext } from "../lib/context";
import { auth } from "../lib/firebase";

import { Button } from 'antd';

import {
  NavbarItem,
  NavbarList,
  LogoContainer,
  ButtonsContainer,
} from "../styles/NavbarStyled";

export default function Navbar() {
  const { user, username } = useContext(UserContext);

  const router = useRouter();

  const signOut = () => {
    auth.signOut();
    router.push("/enter");
  };

  const NavbarContainer = styled.nav`
  display: flex;
  align-items: center;
  height: 70px;
  width: 100%;
  background: #000000;
  color: ${(props) => props.theme.colors.black};
  position: fixed;
  top: 0;
  padding: 0 10vw;
  font-weight: bold;
  border-bottom: 2px solid #b5bdc4;
  z-index: 99;
`;

  return (
    <NavbarContainer>
      <NavbarList>
        <LogoContainer>
          <NavbarItem>
            <Link href="/">
              <Button type="primary" size="large">Next JS</Button>
            </Link>
          </NavbarItem>
        </LogoContainer>
        {username && (
          <ButtonsContainer>
            <NavbarItem>
              <Button type="danger" size="large" onClick={signOut}>Sign Out</Button>
            </NavbarItem>
            <NavbarItem>
              <Link href="/admin">
                <Button type="primary" size="large">New Post</Button>
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link href={`/${username}`}>
                <img
                  style={{ borderRadius: "50%" }}
                  width={50}
                  height={50}
                  src={user?.photoURL || "/hacker.png"}
                />
              </Link>
            </NavbarItem>
          </ButtonsContainer>
        )}

        {!username && (
          <NavbarItem>
            <Link href="/enter">
              <Button type="primary" size="large">Log in</Button>
            </Link>
          </NavbarItem>
        )}
      </NavbarList>
    </NavbarContainer>
  );
}
