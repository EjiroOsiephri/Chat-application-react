import { Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
function App() {
  return (
    <>
      <Routes>
        <Route element={<SignUp />} path="/" />
      </Routes>
    </>
  );
}

export default App;
