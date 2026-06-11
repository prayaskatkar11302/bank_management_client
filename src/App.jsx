import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import DepositMoney from "./pages/DepositMoney";
import SendMoney from "./pages/SendMoney";
import NavbarComponent from "./pages/NavbarComponent";
import Profile from "./pages/Profile";

function Layout() {
  const location = useLocation();
  
  const hideNavbar =
    location.pathname === "/" || location.pathname === "/register";

  return (
    <>
      {!hideNavbar && <NavbarComponent />}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/deposit" element={<DepositMoney />} />
        <Route path="/send" element={<SendMoney />} />
        <Route path="/profile" element={<Profile/>}/>
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;