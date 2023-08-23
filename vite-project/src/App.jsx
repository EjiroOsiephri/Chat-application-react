import { Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import { useContext } from "react";
import AuthContext from "./context/Auth-context";
function App() {
  const ctx = useContext(AuthContext);
  return (
    <>
      <Routes>
        <Route element={<SignUp />} path="/" />
      </Routes>
    </>
  );
}

export default App;
