import { Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import { useContext } from "react";
import AuthContext from "./context/Auth-context";
import ChannelPage from "./components/chat-nav/ChannelPage";
import ChannelHome from "./components/chat-application/ChannelHome";
function App() {
  const ctx = useContext(AuthContext);
  return (
    <>
      <Routes>
        <Route element={<SignUp />} path="/" />
        <Route element={<ChannelHome />} path="/channel" />
      </Routes>
    </>
  );
}

export default App;
