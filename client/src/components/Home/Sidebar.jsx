import { ChatIcon, LockIcon } from "@chakra-ui/icons";
import {
  VStack,
  HStack,
  Heading,
  Button,
  Divider,
  Text,
  Circle,
  useDisclosure,
} from "@chakra-ui/react";

import { Tab, TabList } from "@chakra-ui/tabs";
import { useContext } from "react";
import { FriendContext } from "./Home";
import AddFriendModel from "./AddFriendModel";
import { AccountContext } from "../AccountContext";

export default function Sidebar() {
  const { friendList } = useContext(FriendContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, setUser } = useContext(AccountContext);
  return (
    <>
      <VStack py="1.4rem">
        <HStack justify="space-evenly" w="100%">
          <Heading size="md">🚹 {user.status}</Heading>
          <Button
            colorScheme="teal"
            onClick={() => {
              setUser({ loggedIn: false });
            }}
          >
            Log Out <LockIcon></LockIcon>
          </Button>
        </HStack>
        <HStack justify="space-evenly" w="100%">
          <Heading size="md">Add Friend</Heading>
          <Button onClick={onOpen}>
            <ChatIcon></ChatIcon>
          </Button>
        </HStack>
        <Divider></Divider>
        <VStack as={TabList}>
          {friendList.map((friend) => (
            <HStack as={Tab} key={`friend:${friend.username}`}>
              <Circle
                bg={friend.connected ? "green.500" : "red.500"}
                h="20px"
                w="20px"
              ></Circle>
              <Text>{friend.username}</Text>
            </HStack>
          ))}
        </VStack>
      </VStack>
      <AddFriendModel isOpen={isOpen} onClose={onClose}></AddFriendModel>
    </>
  );
}
