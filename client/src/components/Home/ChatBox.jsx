import { Button, HStack, Input } from "@chakra-ui/react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import socket from "../../socket";
import { useContext } from "react";
import { MessagesContext } from "./Home";

export default function ChatBox({ userid }) {
  const { setMessages } = useContext(MessagesContext);
  return (
    <Formik
      initialValues={{ message: "" }}
      validationSchema={Yup.object({
        message: Yup.string().min(1).max(255),
      })}
      onSubmit={(values, actions) => {
        const message = { from: null, to: userid, content: values.message };
        socket.emit("dm", message);
        setMessages((perMsg) => [message, ...perMsg]);
        actions.resetForm();
      }}
    >
      <HStack as={Form} w="100%" pb="1rem" px="1rem">
        <Input
          as={Field}
          name="message"
          placeholder="Type message here.."
          size="lg"
          autoComplete="off"
        />
        <Button type="submit" size="lg" colorScheme="teal">
          Send
        </Button>
      </HStack>
    </Formik>
  );
}
