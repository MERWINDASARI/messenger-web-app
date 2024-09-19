import { useContext, useEffect } from "react";
import socket from "../../socket";
import { AccountContext } from "../AccountContext";

const useSocketSetup = (setFriendList, setMessages) => {
  const { setUser } = useContext(AccountContext);
  useEffect(() => {
    socket.connect();

    socket.on("friends", (friendList) => {
      setFriendList(friendList);
    });

    socket.on("messages", (messages) => {
      setMessages(messages);
    });

    socket.on("dm", (message) => {
      setMessages((preMsgs) => [message, ...preMsgs]);
    });

    socket.on("connected", (status, username) => {
      setFriendList((prevFriends) => {
        return [...prevFriends].map((friend) => {
          if (friend.username === username) {
            friend.connected = status;
          }
          return friend;
        });
      });
    });

    socket.on("connect_error", () => {
      console.log("Not able to connect");
      setUser({ loggedIn: false });
    });
    return () => {
      //un register events
      socket.off("connect_error");
      socket.off("connected");
      socket.off("messages");
      socket.off("friends");
    };
  }, [setUser, setFriendList, setMessages]);
};

export default useSocketSetup;
