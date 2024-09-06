import {
  VStack,
  ButtonGroup,
  FormControl,
  FormLabel,
  Button,
  FormErrorMessage,
  Input,
  Heading,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import TextField from "./TexField";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function Login() {
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
        fetch("http://localhost:4000/auth/login", {
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
            Console.log(data);
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
        <Heading>Log In</Heading>
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
            Log In
          </Button>
          <Button onClick={() => navigate("/register")}>Create Account</Button>
        </ButtonGroup>
      </VStack>
    </Formik>
  );
}
