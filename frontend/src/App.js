import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import UserDashboard from "./components/UserDashboard";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}>
        </Route>
        <Route path="/register" element={<Register />}>
        </Route>
        <Route path="/user-dashboard" element={<><Navbar /><UserDashboard /></>}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;