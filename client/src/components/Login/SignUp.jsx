import {
  VStack,
  ButtonGroup,
  FormControl,
  FormLabel,
  Button,
  FormErrorMessage,
  Input,
  Heading,
  useConst,
  Text,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import TextField from "../TexField";
import { useNavigate } from "react-router";
import { ArrowBackIcon } from "@chakra-ui/icons";
import * as Yup from "yup";
import { AccountContext } from "../AccountContext";
import { useContext, useState } from "react";

export default function SignUp() {
  const { setUser } = useContext(AccountContext);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      validationSchema={Yup.object({
        username: Yup.string()
          .required("Username required")
          .min(6, "Username too short")
          .max(28, "Username too long!"),
        password: Yup.string()
          .required("Password required")
          .min(6, "Password too short")
          .max(28, "Password too long!"),
      })}
      onSubmit={(values, actions) => {
        const vals = { ...values };
        actions.resetForm();

        fetch(`${import.meta.env.VITE_SERVER_URL}/auth/register`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(vals),
        })
          .catch((err) => {
            return;
          })
          .then((res) => {
            if (!res || !res.ok || res.status >= 400) {
              return;
            }
            return res.json();
          })
          .then((data) => {
            if (!data) return;
            setUser({ ...data });
            if (data.loggedIn) {
              navigate("/home");
            } else if (data.status) {
              setError(data.status);
            }
          });
      }}
    >
      <VStack
        as={Form}
        w={{ base: "90%", md: "500px" }}
        m="auto"
        justify="center"
        h="100vh"
        spacing="1rem"
      >
        <Heading>Sign Up</Heading>
        <Text as="p" color="red.500">
          {error}
        </Text>
        <TextField
          name="username"
          autoComplete="off"
          placeholder="Enter Username"
          label="Username"
          type="text"
        ></TextField>
        <TextField
          name="password"
          autoComplete="off"
          placeholder="Enter Password"
          label="Password"
          type="password"
        ></TextField>
        <ButtonGroup pt="1rem">
          <Button colorScheme="teal" type="Submit">
            Create Account
          </Button>
          <Button onClick={() => navigate("/")} leftIcon={<ArrowBackIcon />}>
            Back
          </Button>
        </ButtonGroup>
      </VStack>
    </Formik>
  );
}
