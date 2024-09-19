import {
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import TextField from "../TexField";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import socket from "../../socket";
import { useCallback, useContext, useState } from "react";
import { FriendContext } from "./Home";

export default function AddFriendModel({ isOpen, onClose }) {
  const [errMsg, setErrorMsg] = useState("");
  const closeModal = useCallback(() => {
    setErrorMsg("");
    console.log("closing..");
    onClose();
  }, [onClose]);
  const { setFriendList } = useContext(FriendContext);
  return (
    <Modal isOpen={isOpen} onClose={closeModal} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add a Friend</ModalHeader>
        <ModalCloseButton></ModalCloseButton>
        <Formik
          initialValues={{ friendname: "" }}
          validationSchema={Yup.object({
            friendname: Yup.string()
              .required("Username required")
              .min(6, "Invalid Username")
              .max(28, "Invalid Username"),
          })}
          onSubmit={(values) => {
            socket.emit(
              "add_friend",
              values.friendname,
              ({ errorMsg, done, newFriend }) => {
                if (done) {
                  setFriendList((c) => [newFriend, ...c]);
                  closeModal();
                  return;
                }
                setErrorMsg(errorMsg);
              }
            );
          }}
        >
          <Form>
            <ModalBody>
              <Heading fontSize="xl" as="p" color="red.500" textAlign="center">
                {errMsg}
              </Heading>
              <TextField
                name="friendname"
                autoComplete="off"
                placeholder="Enter friend's username"
                label="friend's name"
                type="text"
              ></TextField>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" type="submit">
                Submit
              </Button>
            </ModalFooter>
          </Form>
        </Formik>
      </ModalContent>
    </Modal>
  );
}
