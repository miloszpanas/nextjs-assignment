import { useState, useEffect, useCallback } from "react";
import { useContext } from "react";
import styled from "styled-components";
import debounce from "lodash.debounce";
import { UserContext } from "../lib/context";
import { googleAuthProvider, auth, firestore } from "../lib/firebase";
import router, { useRouter } from "next/router";
import { GoogleButton, GoogleImage } from "../styles/NavbarStyled";
import { Button, Form, Input } from "antd";

const SignIn: React.FC = (): JSX.Element => {
  const router = useRouter();
  const googleSignIn = async () => {
    try {
      await auth.signInWithPopup(googleAuthProvider);
    } catch (error) {
      console.error(error);
    }
    router.push("/enter");
  };

  return (
    <GoogleButton onClick={googleSignIn}>
      <GoogleImage src={"/google-pic.png"} />
      Sign in with Google
    </GoogleButton>
  );
};

const SignOut: React.FC = (): JSX.Element => {
  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Button type="primary" danger size="large" onClick={handleSignOut}>
      <span>Sign Out</span>
    </Button>
  );
};

const UserNameContainer = styled.div`
  display: flex;
  justify-content: center;
  background-color: white;
  width: 50%;
  margin: 7rem auto;
  padding: 5rem;
  border: 1px solid ${(props) => props.theme.colors.gray};
  border-radius: 8px;
`;

const UsernameWrapper = styled.div`
  width: 100%auto;
`;

const EnterPage: React.FC<{ className: string }> = ({ className }) => {
  const { user, username } = useContext(UserContext);

  useEffect(() => {
    if (username) {
      router.push("/");
    }
  }, [username]);

  return (
    <UserNameContainer>
      {user ? !username ? <UsernameForm /> : <SignOut /> : <SignIn />}
    </UserNameContainer>
  );
};

const UsernameMessage: React.FC<{
  username: string;
  isValid: boolean;
  loading: boolean;
}> = ({ username, isValid, loading }) => {
  if (loading) return <p>Checking...</p>;
  if (isValid) return <p>{username} is available!</p>;
  if (username && !isValid) return <p>{username} is taken!</p>;
  return null;
};

// Username form
const UsernameForm: React.FC = (): JSX.Element => {
  const [formValue, setFormValue] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const { user, username } = useContext(UserContext);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userDoc = firestore.doc(`users/${user.uid}`);
    const usernameDoc = firestore.doc(`usernames/${formValue}`);

    const batch = firestore.batch();
    batch.set(userDoc, {
      username: formValue,
      photoURL: user.photoURL,
      displayName: user.displayName,
    });
    batch.set(usernameDoc, { uid: user.uid });

    await batch.commit();
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toLowerCase();
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    if (val.length < 3) {
      setFormValue(val);
      setLoading(false);
      setIsValid(false);
    }

    if (re.test(val)) {
      setFormValue(val);
      setLoading(true);
      setIsValid(false);
    }
  };

  useEffect(() => {
    checkUsername(formValue);
  }, [formValue]);

  const checkUsername = useCallback(
    debounce(async (username) => {
      if (username.length >= 3) {
        const ref = firestore.doc(`usernames/${username}`);
        const { exists } = await ref.get();
        setIsValid(!exists);
        setLoading(false);
      }
    }, 500),
    []
  );

  const redirectToMain = () => router.push("/");

  return (
    !username && (
      <UsernameWrapper>
        <h3>Choose Username</h3>
        <Form onFinish={redirectToMain}>
          <Form.Item label="Username" name="username">
            <Input onChange={onChange} />
          </Form.Item>
          <UsernameMessage
            username={formValue}
            isValid={isValid}
            loading={loading}
          />
          <Button
            onClick={onSubmit}
            type="primary"
            shape="round"
            size="large"
            disabled={!isValid}
          >
            Choose
          </Button>
        </Form>
      </UsernameWrapper>
    )
  );
};

export default EnterPage;
