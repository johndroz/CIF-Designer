import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./pages/Nav.js";
import Home from "./pages/Home";
import About from "./pages/About";
import NoPage from "./pages/NoPage";
import Login from "./pages/Login";
import Account from './pages/account';
import Signup from './pages/signup';
import Footer from './pages/Footer.js';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Nav />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<NoPage />} />
          <Route path="login" element={<Login />} />
          <Route path="account" element={<Account />} />
          <Route path="signup" element={<Signup />} />
        </Route>
      </Routes>
    </BrowserRouter>
    <Footer />

    </>
  );
}









export default App;
