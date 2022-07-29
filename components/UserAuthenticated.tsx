import React from "react";
import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "../lib/context";

interface IProps {
  children: React.ReactElement<any, any>;
  fallback?: React.ReactNode;
}

export const UserAuthenticated: React.FC<IProps> = ({ children, fallback }) => {
  const { username } = useContext(UserContext);

  return username
    ? children
    : fallback || <Link href="/enter">You must be signed in</Link>;
};
