import "antd/dist/antd.css";
import { ThemeProvider } from "styled-components";
import { Toaster } from "react-hot-toast";
import { NextPage } from "next";


import { theme } from "../styles/Theme";
import Navigation from "../components/Navigation";
import { UserContext } from "../lib/context";
import { useUserData } from "../lib/hooks";
import { Post } from ".";

const MyApp: React.FC<{
  Component: NextPage<any>;
  pageProps: Post[];
}> = ({ Component, pageProps }) => {
  const userData = useUserData();

  return (
    <UserContext.Provider value={userData}>
      <ThemeProvider theme={theme}>
        <style jsx global>{`
          body,
          html {
            margin: 0;
            padding: 0;
            font-size: 18px;
            font-weight: 400;
            line-height: 1.8;
            color: rgb(0, 0, 0);
            background: #ffffff;
            font-family: sans-serif;
          }
        `}</style>
        <Navigation />
        <Component {...pageProps} />
        <Toaster />
      </ThemeProvider>
    </UserContext.Provider>
  );
};

export default MyApp;
