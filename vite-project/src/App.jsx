import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./pages/SignUp";
import { useContext } from "react";
import AuthContext from "./context/Auth-context";
import ChannelHome from "./components/chat-application/ChannelHome";

function App() {
  const ctx = useContext(AuthContext);
  return (
    <>
      <Routes>
        <Route element={<SignUp />} path="/" />
        {ctx.isLoggedIn && <Route element={<ChannelHome />} path="/channel" />}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
