import { UserAuthenticated } from "../../components/UserAuthenticated";
import { UserContext } from "../../lib/context";
import { Form, Button, Input } from "antd";
import styled from "styled-components";
import { firestore, auth, serverTimestamp } from "../../lib/firebase";

import { useContext, useState } from "react";
import { useRouter } from "next/router";

import kebabCase from "lodash.kebabcase";
import toast from "react-hot-toast";

const { TextArea } = Input;

const FormContainer = styled.div`
  margin: 10rem auto;
  width: 60%;
  padding: 3rem;
  border-radius: 5px;
  border: 1px solid ${(props) => props.theme.colors.gray};
`;

const AdminPostsPage: React.FC = (): JSX.Element => {
  return (
    <UserAuthenticated>
      <CreateNewPost />
    </UserAuthenticated>
  );
};

const CreateNewPost: React.FC = (): JSX.Element => {
  const router = useRouter();
  const { username } = useContext(UserContext);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const slug = encodeURI(kebabCase(title));
  const isValid = title.length > 3 && title.length < 100;

  const createPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const uid = auth.currentUser.uid;
    const ref = firestore
      .collection("users")
      .doc(uid)
      .collection("posts")
      .doc(slug);

    const data = {
      title,
      slug,
      uid,
      username,
      published: true,
      content,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    await ref.set(data);

    toast.success("Post created!");
    router.push(`/`);
  };

  return (
    <FormContainer>
      <Form layout="vertical" size="large">
        <Form.Item label="Title" name="title">
          <Input
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Article title"
          />
        </Form.Item>
        <Form.Item label="Content" name="content">
          <TextArea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Article content"
            maxLength={8}
          />
        </Form.Item>
        <Button
          type="primary"
          size="large"
          disabled={!isValid}
          onClick={createPost}
        >
          Create New Post
        </Button>
      </Form>
    </FormContainer>
  );
};

export default AdminPostsPage;
