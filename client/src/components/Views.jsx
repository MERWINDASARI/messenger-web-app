import { Routes, Route } from "react-router-dom";
import Login from "./Login/Login";
import SignUp from "./Login/SignUp";
import { Text } from "@chakra-ui/react";
import PrivateRoutes from "./PrivateRoutes";
import { AccountContext } from "./AccountContext";
import { useContext } from "react";
export default function Views() {
  const { user } = useContext(AccountContext);
  return user.loggedIn === null ? (
    <Text>Loading...</Text>
  ) : (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<SignUp />} />
      <Route element={<PrivateRoutes />}>
        <Route path="/home" element={<Text>Home</Text>} />
      </Route>
      <Route path="*" element={<Login />} />
    </Routes>
  );
}
