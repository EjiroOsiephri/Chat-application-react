import { Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import { useContext } from "react";
import AuthContext from "./context/Auth-context";
import ChannelPage from "./components/chat-nav/ChannelPage";
function App() {
  const ctx = useContext(AuthContext);
  return (
    <>
      <Routes>
        <Route element={<SignUp />} path="/" />
        <Route element={<ChannelPage />} path="/channel" />
      </Routes>
    </>
  );
}

export default App;
